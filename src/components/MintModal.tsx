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
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-sm luxury-card floating-ui p-8 text-center shadow-2xl overflow-hidden"
          >
            {/* Background Glow */}
            <div className={`absolute -top-24 left-1/2 -translate-x-1/2 w-48 h-48 blur-[80px] rounded-full opacity-20 ${
              status === "success" ? "bg-status-success" : "bg-status-error"
            }`} />

            <div className="relative z-10 flex flex-col items-center gap-6">
              <div className={`w-20 h-20 rounded-full flex items-center justify-center ${
                status === "success" ? "bg-status-success/10 text-status-success" : "bg-status-error/10 text-status-error"
              }`}>
                {status === "success" ? (
                  <CheckCircle2 className="w-10 h-10" />
                ) : (
                  <AlertCircle className="w-10 h-10" />
                )}
              </div>

              <div className="space-y-2">
                <h3 className="text-2xl font-display text-text-primary uppercase tracking-tighter">
                  {status === "success" ? t("mint.success_title") : t("mint.error_title")}
                </h3>
                <p className="text-text-secondary text-sm font-light leading-relaxed">
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
                  className="flex items-center gap-2 text-[10px] text-accent-gold hover:text-text-primary transition-colors uppercase font-bold tracking-widest"
                >
                  {t("mint.view_etherscan")} <ExternalLink className="w-3 h-3" />
                </a>
              )}

              <button
                onClick={onClose}
                className="w-full py-4 bg-bg-card hover:bg-bg-secondary border border-border-soft rounded-2xl text-text-primary text-[10px] font-bold uppercase tracking-[0.2em] transition-all"
              >
                {status === "success" ? t("mint.continue") : t("mint.close")}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
