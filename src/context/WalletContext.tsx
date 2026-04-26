import React, { createContext, useContext, useState, ReactNode } from 'react';

interface WalletContextType {
  isConnected: boolean;
  address: string | null;
  connect: () => Promise<void>;
  disconnect: () => void;
  ownedNfts: string[]; // IDs of owned NFTs
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export const WalletProvider = ({ children }: { children: ReactNode }) => {
  const [isConnected, setIsConnected] = useState(false);
  const [address, setAddress] = useState<string | null>(null);
  const [ownedNfts, setOwnedNfts] = useState<string[]>([]);

  const connect = async () => {
    // Mocking ethers.js provider request
    console.log("Requesting account access...");
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const mockAddress = "0x8f2c...3d4f";
    setAddress(mockAddress);
    setIsConnected(true);
    setOwnedNfts(["2", "5"]); // Mocking some owned NFTs (Royal Raccoon Batak and Royal Raccoon Riau Islands)
    console.log("Connected to", mockAddress);
  };

  const disconnect = () => {
    setIsConnected(false);
    setAddress(null);
    setOwnedNfts([]);
  };

  return (
    <WalletContext.Provider value={{ isConnected, address, connect, disconnect, ownedNfts }}>
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
