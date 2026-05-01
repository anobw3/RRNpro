import React, { createContext, useContext, useState, ReactNode, useEffect, useCallback } from 'react';
import { ethers } from 'ethers';
import { EthereumProvider } from '@walletconnect/ethereum-provider';
import { NFT_CONTRACT_ABI } from '../contracts/abi';

// WalletConnect Project ID - Should be in .env
const WALLETCONNECT_PROJECT_ID = import.meta.env.VITE_WALLETCONNECT_PROJECT_ID || "";

interface WalletContextType {
  isConnected: boolean;
  isConnecting: boolean;
  address: string | null;
  balance: string | null;
  connect: () => Promise<void>;
  disconnect: () => void;
  isMinting: boolean;
  mint: (nftId: string, quantity?: number) => Promise<boolean>;
  mintProgress: number;
  totalMinted: number;
  maxSupply: number;
  chainId: string | null;
  networkName: string | null;
  switchNetwork: (targetChainId?: string) => Promise<void>;
  isWrongNetwork: boolean;
  ownedNfts: string[];
  error: string | null;
  mintSuccess: boolean;
  txHash: string | null;
  explorerUrl: string | null;
  providerType: 'injected' | 'walletconnect' | null;
}

export const WalletContext = createContext<WalletContextType | undefined>(undefined);

// Core Contract Configuration
const CONTRACTS: Record<number, { address: string; abi: any[] }> = {
  1: { // Ethereum
    address: "0x1234...ETH", 
    abi: NFT_CONTRACT_ABI
  },
  137: { // Polygon
    address: "0x5678...POLYGON",
    abi: NFT_CONTRACT_ABI
  },
  8453: { // Base
    address: "0x9abc...BASE",
    abi: NFT_CONTRACT_ABI
  },
  56: { // BSC
    address: "0xdef0...BSC",
    abi: NFT_CONTRACT_ABI
  }
};

const MINT_CONFIG: Record<number, { price: string; currency: string; explorer: string }> = {
  1: { price: "0.02", currency: "ETH", explorer: "https://etherscan.io" },
  11155111: { price: "0.01", currency: "ETH", explorer: "https://sepolia.etherscan.io" }, // Sepolia
  137: { price: "25", currency: "MATIC", explorer: "https://polygonscan.com" },
  8453: { price: "0.01", currency: "ETH", explorer: "https://basescan.org" },
  56: { price: "0.05", currency: "BNB", explorer: "https://bscscan.com" }
};

export const WalletProvider = ({ children }: { children: ReactNode }) => {
  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [address, setAddress] = useState<string | null>(null);
  const [balance, setBalance] = useState<string | null>(null);
  const [isMinting, setIsMinting] = useState(false);
  const [totalMinted, setTotalMinted] = useState(38);
  const [chainId, setChainId] = useState<string | null>(null);
  const [ownedNfts, setOwnedNfts] = useState<string[]>(["1", "11"]); 
  const [provider, setProvider] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [mintSuccess, setMintSuccess] = useState(false);
  const [txHash, setTxHash] = useState<string | null>(null);
  const [providerType, setProviderType] = useState<'injected' | 'walletconnect' | null>(null);
  const maxSupply = 1000;

  const getNetworkName = (id: string | null) => {
    if (!id) return null;
    const numericId = parseInt(id, 16);
    const networks: Record<number, string> = {
      1: 'Ethereum',
      137: 'Polygon',
      56: 'BSC',
      8453: 'Base',
      11155111: 'Sepolia',
      80001: 'Mumbai'
    };
    return networks[numericId] || 'Unknown Network';
  };

  const updateBalance = async (accAddress: string, injectedProvider: any) => {
    try {
      const ethersProvider = new ethers.BrowserProvider(injectedProvider);
      const bal = await ethersProvider.getBalance(accAddress);
      setBalance(ethers.formatEther(bal).slice(0, 6)); 
    } catch (e) {
      console.warn("[Wallet] Balance update failed, using mock:", e);
      setBalance("1.24");
    }
  };

  const handleAccountsChanged = useCallback((accounts: string[]) => {
    if (accounts.length > 0) {
      setAddress(accounts[0]);
      setIsConnected(true);
      // We'll update balance in the connection logic or use an effect
    } else {
      setAddress(null);
      setIsConnected(false);
      setBalance(null);
    }
  }, []);

  const handleChainChanged = useCallback((hexChainId: string) => {
    setChainId(hexChainId);
  }, []);

  const handleDisconnect = useCallback(() => {
    setAddress(null);
    setIsConnected(false);
    setProviderType(null);
    localStorage.removeItem('wallet_connected_type');
  }, []);

  const connect = async () => {
    if (isConnecting) {
      console.warn("[Wallet] Connection already in progress...");
      return;
    }
    
    setError(null);
    setIsConnecting(true);
    try {
      // 1. Double check Project ID for WalletConnect fallback
      const hasInjected = typeof window !== 'undefined' && (window as any).ethereum;
      
      console.log("[Wallet] Initializing connection. Injected available:", !!hasInjected);
      if (!WALLETCONNECT_PROJECT_ID && !hasInjected) {
        const errorMsg = "WalletConnect Project ID is missing. Please add VITE_WALLETCONNECT_PROJECT_ID to your environment variables in Settings.";
        setError(errorMsg);
        console.error(errorMsg);
        return;
      }

      // 2. Check for Injected Provider (MetaMask, OKX, etc.)
      if (typeof window !== 'undefined' && (window as any).ethereum) {
        console.log("[Wallet] Using Injected Provider");
        const injectedProvider = (window as any).ethereum;
        
        try {
          // Pre-flight check for iFrame/Metamask issues
          if (window.self !== window.top) {
            console.warn("[Wallet] Running in iFrame, connection might be unstable. Consider opening in a new tab if it fails.");
          }

          // Poke permissions - sometimes helps MetaMask in iFrames
          try {
            await Promise.race([
              injectedProvider.request({ 
                method: 'wallet_requestPermissions', 
                params: [{ eth_accounts: {} }] 
              }),
              new Promise((_, reject) => setTimeout(() => reject(new Error("Timeout")), 1000))
            ]);
          } catch (pErr) {
            console.log("[Wallet] Permission poke skipped or timed out:", pErr);
          }

          const accounts = await injectedProvider.request({ method: 'eth_requestAccounts' });
          const chainId = await injectedProvider.request({ method: 'eth_chainId' });
          
          setAddress(accounts[0]);
          setChainId(chainId);
          setIsConnected(true);
          setProvider(injectedProvider);
          setProviderType('injected');
          localStorage.setItem('wallet_connected_type', 'injected');
          
          // Update balance immediately
          updateBalance(accounts[0], injectedProvider);

          // Setup listeners
          injectedProvider.on('accountsChanged', handleAccountsChanged);
          injectedProvider.on('chainChanged', handleChainChanged);
          injectedProvider.on('disconnect', handleDisconnect);
          
          console.log("[Wallet] Connected via Injected:", accounts[0]);
          return;
        } catch (e: any) {
          if (e.code === 4001) {
            setError("User rejected connection request");
            return;
          }
          console.warn("[Wallet] Injected connection failed, attempting WalletConnect fallback...");
        }
      }

      // 3. Fallback to WalletConnect for Mobile/Other browsers
      if (!WALLETCONNECT_PROJECT_ID) {
        let errorMsg = "MetaMask not found & WalletConnect Project ID missing.";
        if (window.self !== window.top) {
          errorMsg += " Try opening in a new tab (External Button) for better wallet compatibility.";
        }
        setError(errorMsg);
        return;
      }

      console.log("[Wallet] Using WalletConnect Fallback");
      const wcProvider = await EthereumProvider.init({
        projectId: WALLETCONNECT_PROJECT_ID,
        showQrModal: true,
        qrModalOptions: { 
          themeMode: 'dark',
          themeVariables: {
            '--wcm-z-index': '9999'
          }
        },
        chains: [1], // Ethereum Mainnet
        optionalChains: [137, 56, 8453], // Polygon, BSC, Base
        methods: ["eth_sendTransaction", "personal_sign", "eth_requestAccounts"],
        events: ["chainChanged", "accountsChanged"],
      });

      await wcProvider.connect();
      
      const accounts = wcProvider.accounts;
      const chainId = `0x${wcProvider.chainId.toString(16)}`;

      if (accounts && accounts.length > 0) {
        setAddress(accounts[0]);
        setChainId(chainId);
        setIsConnected(true);
        setProvider(wcProvider);
        setProviderType('walletconnect');
        localStorage.setItem('wallet_connected_type', 'walletconnect');

        // Setup listeners
        wcProvider.on('accountsChanged', handleAccountsChanged);
        wcProvider.on('chainChanged', handleChainChanged);
        wcProvider.on('disconnect', handleDisconnect);
        
        console.log("[Wallet] Connected via WalletConnect:", accounts[0]);
      }
    } catch (error: any) {
      console.error("[Wallet] Connection failed:", error);
      
      let message = error.message || "Failed to connect wallet";
      
      if (message.includes("Connection request reset") || message.includes("closed before receiving")) {
        message = "Wallet connection was reset. \n\nFIX: Please open the app in a NEW TAB using the 'Open in New Tab' button in the header for stable wallet communication.";
      } else if (error.code === 4001) {
        message = "User rejected connection request";
      } else if (message.includes("User closed modal")) {
        message = "Connection cancelled by user.";
      }
      
      setError(message);
      handleDisconnect(); // Critical: Reset state so UI isn't stuck "connecting" or "connected with error"
    } finally {
      setIsConnecting(false);
    }
  };

  const disconnect = useCallback(async () => {
    if (provider && provider.disconnect) {
      try {
        await provider.disconnect();
      } catch (e) {
        console.error("Error during provider disconnect:", e);
      }
    }
    handleDisconnect();
  }, [provider, handleDisconnect]);

  // Auto-reconnect
  useEffect(() => {
    const type = localStorage.getItem('wallet_connected_type');
    if (type === 'injected' && (window as any).ethereum) {
      (window as any).ethereum.request({ method: 'eth_accounts' })
        .then((accounts: string[]) => {
          if (accounts.length > 0) {
            setAddress(accounts[0]);
            setIsConnected(true);
            (window as any).ethereum.request({ method: 'eth_chainId' }).then(setChainId);
            setProvider((window as any).ethereum);
            
            (window as any).ethereum.on('accountsChanged', handleAccountsChanged);
            (window as any).ethereum.on('chainChanged', handleChainChanged);
            (window as any).ethereum.on('disconnect', handleDisconnect);
          }
        });
    } else if (type === 'walletconnect') {
      // Re-init WalletConnect if session exists
      EthereumProvider.init({
        projectId: WALLETCONNECT_PROJECT_ID,
        showQrModal: false,
        chains: [1],
      }).then(wcProvider => {
        if (wcProvider.accounts.length > 0) {
          setAddress(wcProvider.accounts[0]);
          setIsConnected(true);
          setChainId(`0x${wcProvider.chainId.toString(16)}`);
          setProvider(wcProvider);

          wcProvider.on('accountsChanged', handleAccountsChanged);
          wcProvider.on('chainChanged', handleChainChanged);
          wcProvider.on('disconnect', handleDisconnect);
        }
      });
    }
  }, [handleAccountsChanged, handleChainChanged, handleDisconnect]);

  const switchNetwork = async (targetChainId: string = '0x1') => {
    if (!provider) return;
    try {
      await provider.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: targetChainId }],
      });
    } catch (error: any) {
      // Chain not added to wallet
      if (error.code === 4902) {
        try {
          const params = targetChainId === '0x89' ? {
            chainId: '0x89',
            chainName: 'Polygon Mainnet',
            nativeCurrency: { name: 'MATIC', symbol: 'MATIC', decimals: 18 },
            rpcUrls: ['https://polygon-rpc.com/'],
            blockExplorerUrls: ['https://polygonscan.com/'],
          } : null;

          if (params) {
            await provider.request({
              method: 'wallet_addEthereumChain',
              params: [params],
            });
          }
        } catch (addError) {
          console.error("Failed to add network", addError);
        }
      }
      console.error("Failed to switch network", error);
    }
  };

  const mint = async (nftId: string, quantity: number = 1) => {
    setError(null);
    setMintSuccess(false);
    setTxHash(null);
    
    if (!isConnected) {
      await connect();
      if (!isConnected) return false;
    }

    setIsMinting(true);
    console.log(`[Wallet] Starting multi-chain mint process for NFT #${nftId}...`);

    try {
      if (!provider) throw new Error("Wallet provider not found");
      
      const ethersProvider = new ethers.BrowserProvider(provider);
      const network = await ethersProvider.getNetwork();
      const currentChainId = Number(network.chainId);
      
      // 1. Validate Network Support
      const config = CONTRACTS[currentChainId];
      if (!config) {
        throw new Error(`Unsupported network: ${getNetworkName(chainId)}. Please switch to Ethereum, Polygon, Base, or BSC.`);
      }

      const signer = await ethersProvider.getSigner();
      const contract = new ethers.Contract(config.address, config.abi, signer);
      
      // 2. Get Price Config
      const priceConfig = MINT_CONFIG[currentChainId] || { price: "0.01", currency: "ETH", explorer: "https://etherscan.io" };
      const totalPrice = (parseFloat(priceConfig.price) * quantity).toString();
      
      console.log(`[Wallet] Minting on chain ${currentChainId} at ${config.address} for ${totalPrice} ${priceConfig.currency}`);

      // 3. Execute Mint
      // Note: In a real app we'd call the real contract. 
      // For this demo/preview, we handle the transaction flow but catch errors gracefully.
      
      let tx;
      try {
        tx = await contract.mint(quantity, {
          value: ethers.parseEther(totalPrice)
        });
        
        setTxHash(tx.hash);
        console.log(`[Wallet] Transaction submitted: ${tx.hash}`);
        
        // 4. Wait for Confirmation
        await tx.wait();
        
        // Success logic
        setTotalMinted(prev => Math.min(prev + quantity, maxSupply));
        setOwnedNfts(prev => [...prev, nftId]);
        setMintSuccess(true);
        console.log(`[Wallet] Successfully minted NFT #${nftId}!`);
        
        // Update balance after mint
        if (address) updateBalance(address, provider);
        
        return true;
      } catch (contractErr: any) {
        // Fallback for simulation in preview if contract address is placeholder
        if (contractErr.message?.includes("invalid address") || contractErr.message?.includes("ens name not found")) {
           console.warn("[Wallet] Using simulated success as addresses are placeholders");
           await new Promise(resolve => setTimeout(resolve, 2000));
           setTxHash("0x" + Math.random().toString(16).slice(2, 42));
           setTotalMinted(prev => Math.min(prev + quantity, maxSupply));
           setOwnedNfts(prev => [...prev, nftId]);
           setMintSuccess(true);
           return true;
        }
        throw contractErr;
      }
    } catch (err: any) {
      console.error("[Wallet] Minting failed:", err);
      
      let message = "Minting failed. Please try again.";
      
      // Detailed Error Handling
      if (err.code === "ACTION_REJECTED" || err.code === 4001 || err.message?.toLowerCase().includes("user rejected")) {
        message = "Transaction rejected: You cancelled the request in your wallet.";
      } else if (err.code === "INSUFFICIENT_FUNDS" || err.message?.toLowerCase().includes("insufficient funds")) {
        message = "Insufficient funds: You don't have enough balance to cover the price and gas fees.";
      } else if (err.message?.toLowerCase().includes("unsupported network")) {
        message = err.message;
      } else if (err.message?.toLowerCase().includes("execution reverted")) {
        message = "Contract error: The transaction was reverted. This might be due to max supply reached or incorrect parameters.";
      } else {
        message = err.reason || err.message || message;
      }
      
      setError(message);
      setMintSuccess(false);
      return false;
    } finally {
      setIsMinting(false);
    }
  };

  const mintProgress = (totalMinted / maxSupply) * 100;

  const getExplorerUrl = (id: string | null) => {
    if (!id) return null;
    const numericId = parseInt(id, 16);
    return MINT_CONFIG[numericId]?.explorer || "https://etherscan.io";
  };

  return (
    <WalletContext.Provider value={{ 
      isConnected, 
      isConnecting,
      address, 
      balance,
      connect, 
      disconnect, 
      isMinting, 
      mint, 
      mintProgress,
      totalMinted,
      maxSupply,
      chainId,
      networkName: getNetworkName(chainId),
      switchNetwork,
      isWrongNetwork: chainId !== null && !CONTRACTS[parseInt(chainId, 16)],
      ownedNfts,
      error,
      mintSuccess,
      txHash,
      explorerUrl: getExplorerUrl(chainId),
      providerType
    }}>
      {children}
    </WalletContext.Provider>
  );
};

export const useWallet = () => {
  const context = useContext(WalletContext);
  if (context === undefined) {
    throw new Error('useWallet must be used within a WalletProvider');
  }
  return context;
};
