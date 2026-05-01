import { motion, AnimatePresence } from "motion/react";
import { X, CheckCircle2, AlertCircle, ExternalLink, Zap } from "lucide-react";
import { useTranslation } from "../context/LanguageContext";
import { useWallet } from "../context/WalletContext";

interface MintModalProps {
  isOpen: boolean;
  onClose: () => void;
  status: "success" | "error";
  txHash?: string;
  message?: string;
}

export default function MintModal({ isOpen, onClose, status, txHash, message }: MintModalProps) {
  const { t } = useTranslation();
  const { explorerUrl } = useWallet();
  
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-bg-primary/90 backdrop-blur-2xl"
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            className="relative w-full max-w-md bg-bg-card border border-border-soft rounded-[32px] p-8 sm:p-10 text-center shadow-3xl overflow-hidden"
          >
            {/* Background Glow */}
            <div className={`absolute -top-32 left-1/2 -translate-x-1/2 w-64 h-64 blur-[100px] rounded-full opacity-30 ${
              status === "success" ? "bg-status-success" : "bg-status-error"
            }`} />

            <div className="relative z-10 flex flex-col items-center gap-8">
              <div className={`w-24 h-24 rounded-full flex items-center justify-center p-0.5 bg-gradient-to-br from-white/10 to-transparent border border-white/5`}>
                 <div className={`w-full h-full rounded-full flex items-center justify-center ${
                    status === "success" ? "bg-status-success/20 text-status-success shadow-[0_0_30px_rgba(16,185,129,0.3)]" : "bg-status-error/20 text-status-error shadow-[0_0_30px_rgba(239,68,68,0.3)]"
                  }`}>
                    {status === "success" ? (
                      <CheckCircle2 className="w-10 h-10" />
                    ) : (
                      <AlertCircle className="w-10 h-10" />
                    )}
                 </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-3xl font-display font-medium text-text-primary uppercase tracking-tight">
                  {status === "success" ? "Archived Successfully" : "Connection Refused"}
                </h3>
                <p className="text-text-secondary text-sm font-light leading-relaxed max-w-[280px] mx-auto">
                  {message || (status === "success" 
                    ? t("mint.success_msg") 
                    : t("mint.error_msg"))}
                </p>
              </div>

              {status === "success" && txHash && (
                <a 
                  href={`${explorerUrl || 'https://etherscan.io'}/tx/${txHash}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-[9px] text-gold hover:text-text-primary transition-colors uppercase font-bold tracking-[0.2em] px-6 py-2 bg-white/5 rounded-full border border-white/5"
                >
                  Proof of Authenticity <ExternalLink className="w-3 h-3" />
                </a>
              )}

              <button
                onClick={onClose}
                className="btn-primary w-full py-4 !rounded-2xl text-[10px]"
              >
                {status === "success" ? "Continue Journey" : "Return to Vault"}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
