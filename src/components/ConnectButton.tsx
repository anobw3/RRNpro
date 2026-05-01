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
    if (isLoading) return 'bg-bg-primary/50 text-text-muted cursor-not-allowed opacity-50';
    switch (variant) {
      case 'outline':
        return 'border border-gold text-gold hover:bg-gold/10';
      case 'minimal':
        return 'text-text-secondary hover:text-text-primary underline underline-offset-4 decoration-gold/30';
      default:
        return 'btn-primary px-8 py-4 !rounded-2xl';
    }
  };

  return (
    <div className={`relative flex flex-col items-center gap-2 ${className}`}>
      <div className="flex items-center gap-2">
        {!isConnected ? (
          <motion.button
            whileHover={!isLoading ? { y: -2 } : {}}
            whileTap={!isLoading ? { scale: 0.98 } : {}}
            onClick={connect}
            disabled={isLoading}
            className={`flex items-center justify-center gap-3 font-bold uppercase tracking-[0.2em] text-[10px] transition-all ${getVariantStyles()}`}
          >
            {isLoading ? (
              <RefreshCcw className="w-3.5 h-3.5 animate-spin" />
            ) : (
              <Wallet className="w-3.5 h-3.5" />
            )}
            <span>{isConnecting ? 'Authenticating...' : 'Commence Link'}</span>
          </motion.button>
        ) : (
          <div className="flex items-center gap-3">
            {/* Minting State indicator */}
            {isMinting && (
              <div className="flex items-center gap-3 px-4 py-2 rounded-xl border border-gold/30 text-gold bg-bg-card text-[9px] font-black uppercase tracking-[0.25em] animate-pulse">
                <RefreshCcw className="w-3 h-3 animate-spin" />
                Archiving...
              </div>
            )}
            
            {/* Network Indicator */}
            {networkName && (
              <div 
                className={`hidden md:flex items-center gap-2.5 px-4 py-2.5 rounded-xl border text-[9px] font-black uppercase tracking-[0.2em] ${
                  isWrongNetwork 
                  ? 'border-status-error/50 text-status-error bg-status-error/5' 
                  : 'border-border-soft text-text-muted bg-bg-primary/50'
                } ${isLoading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:border-gold/30 transition-all font-sans'}`}
                onClick={() => !isLoading && isWrongNetwork && switchNetwork('0x1')}
                title={isWrongNetwork ? 'Switch to Ethereum Mainnet' : `Relayed via ${networkName}`}
              >
                <div className={`w-1.5 h-1.5 rounded-full ${isWrongNetwork ? 'bg-status-error animate-pulse shadow-[0_0_8px_var(--status-error)]' : 'bg-status-success shadow-[0_0_8px_var(--status-success)]'}`} />
                {networkName}
                {isWrongNetwork && <RefreshCcw className="w-2.5 h-2.5 ml-1" />}
              </div>
            )}

            {/* Address Display */}
            <div className="flex items-center bg-bg-card border border-border-soft rounded-2xl pl-5 pr-1.5 py-1.5 gap-4 shadow-sm">
              <span className="text-[10px] font-bold tracking-[0.1em] text-text-primary uppercase">
                {shortenedAddress}
              </span>
              <button
                onClick={disconnect}
                className="w-8 h-8 rounded-xl bg-bg-primary text-text-muted hover:bg-status-error hover:text-white transition-all flex items-center justify-center"
                title="Disconnect from Archive"
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
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="absolute top-full mt-4 p-4 bg-bg-card border border-status-error/30 rounded-2xl flex items-start gap-4 min-w-[280px] shadow-2xl z-50 overflow-hidden"
          >
            <div className="absolute inset-0 bg-status-error/5 pointer-events-none" />
            <AlertCircle className="w-4 h-4 text-status-error mt-0.5 flex-shrink-0 relative z-10" />
            <div className="flex flex-col gap-1.5 relative z-10">
              <p className="text-[10px] text-status-error font-black uppercase tracking-widest">Protocol Rejection</p>
              <p className="text-[9px] text-text-muted leading-relaxed uppercase tracking-wider">{error}</p>
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
