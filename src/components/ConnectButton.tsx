import React from 'react';
import { useWallet } from '../context/WalletContext';
import { Wallet, LogOut, ChevronRight, AlertCircle, RefreshCcw } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ConnectButtonProps {
  className?: string;
  variant?: 'primary' | 'outline' | 'minimal';
}

/**
 * Universal Connect Wallet Button
 * Handles connection, disconnection, network switching, and error states.
 */
const ConnectButton: React.FC<ConnectButtonProps> = ({ className = '', variant = 'primary' }) => {
  const { 
    isConnected, 
    isConnecting,
    isMinting,
    address, 
    connect, 
    disconnect, 
    networkName, 
    isWrongNetwork, 
    switchNetwork,
    error,
    providerType
  } = useWallet();

  const shortenedAddress = address ? `${address.slice(0, 6)}...${address.slice(-4)}` : '';

  const isLoading = isConnecting || isMinting;

  const getVariantStyles = () => {
    if (isLoading) return 'bg-bg-secondary border border-border-soft text-text-muted cursor-not-allowed opacity-50';
    switch (variant) {
      case 'outline':
        return 'border border-accent-gold/50 text-accent-gold hover:bg-accent-gold/10';
      case 'minimal':
        return 'text-text-secondary hover:text-text-primary';
      default:
        return 'connect-wallet';
    }
  };

  return (
    <div className={`relative flex flex-col items-center gap-2 ${className}`}>
      <div className="flex items-center gap-2">
        {!isConnected ? (
          <motion.button
            whileHover={!isLoading ? { scale: 1.02 } : {}}
            whileTap={!isLoading ? { scale: 0.98 } : {}}
            onClick={connect}
            disabled={isLoading}
            className={`flex items-center gap-2 px-6 py-3 rounded-full font-bold uppercase tracking-widest text-xs transition-all ${getVariantStyles()}`}
          >
            {isLoading ? (
              <RefreshCcw className="w-4 h-4 animate-spin" />
            ) : (
              <Wallet className="w-4 h-4" />
            )}
            <span>{isConnecting ? 'Connecting...' : 'Connect Wallet'}</span>
          </motion.button>
        ) : (
          <div className="flex items-center gap-2">
            {/* Minting State indicator */}
            {isMinting && (
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-accent-gold/30 text-accent-gold bg-accent-gold/5 text-[10px] font-bold uppercase tracking-widest animate-pulse">
                <RefreshCcw className="w-3 h-3 animate-spin" />
                Minting...
              </div>
            )}
            
            {/* Network Indicator */}
            {networkName && (
              <div 
                className={`hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full border text-[10px] font-bold uppercase tracking-tighter ${
                  isWrongNetwork 
                  ? 'border-red-500/50 text-red-500 bg-red-500/10' 
                  : 'border-border-soft text-text-secondary bg-bg-card'
                } ${isLoading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                onClick={() => !isLoading && isWrongNetwork && switchNetwork('0x1')}
                title={isWrongNetwork ? 'Click to switch to Ethereum' : networkName}
              >
                <div className={`w-1.5 h-1.5 rounded-full ${isWrongNetwork ? 'bg-red-500 animate-pulse' : 'bg-green-500'}`} />
                {networkName}
                {isWrongNetwork && <RefreshCcw className={`w-2.5 h-2.5 ml-1 ${isLoading ? '' : ''}`} />}
              </div>
            )}

            {/* Address Display */}
            <div className="flex items-center bg-bg-card border border-border-soft rounded-full pl-4 pr-1 py-1 gap-3">
              <span className="text-[11px] font-mono font-bold text-text-primary">
                {shortenedAddress}
              </span>
              <button
                onClick={disconnect}
                className="p-2 rounded-full bg-bg-card hover:bg-red-500/20 hover:text-red-500 text-text-muted transition-all"
                title="Disconnect Wallet"
              >
                <LogOut className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Error Message */}
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="absolute top-full mt-3 p-3 bg-red-500/10 border border-red-500/20 rounded-xl flex items-start gap-3 min-w-[200px]"
          >
            <AlertCircle className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
            <div className="flex flex-col gap-1">
              <p className="text-[10px] text-red-500 font-bold uppercase">Connection Issue</p>
              <p className="text-[9px] text-text-muted leading-relaxed">{error}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Provider Badge (Debug/Info) */}
      {isConnected && providerType && (
        <div className="absolute -bottom-6 right-2 text-[8px] text-text-muted/30 uppercase font-black tracking-widest">
          VIA: {providerType}
        </div>
      )}
    </div>
  );
};

export default ConnectButton;
