import { motion, AnimatePresence } from "motion/react";
import { Menu, X, Wallet, Zap, ShieldCheck, LogOut, Globe } from "lucide-react";
import { useState, useEffect } from "react";
import { useTranslation } from "../context/LanguageContext";
import { useWallet } from "../context/WalletContext";
import { Language, LANGUAGES } from "../lib/translations";
import LanguageSwitcher from "./LanguageSwitcher";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isWalletOpen, setIsWalletOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const { isConnected, address, connect, disconnect } = useWallet();
  const { t, language, setLanguage } = useTranslation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleWallet = () => setIsWalletOpen(!isWalletOpen);

  const handleConnect = async () => {
    await connect();
    setIsWalletOpen(false);
  };

  const navLinks = [
    { name: t("nav.collection"), href: "#collection" },
    { name: t("nav.marketplace"), href: "#marketplace" },
    { name: t("nav.lore"), href: "#lore" },
    { name: t("nav.manifesto"), href: "#manifesto" },
  ];

  return (
    <>
      <nav 
        className={`fixed top-0 inset-inline-0 transition-all duration-700 z-[100] px-4 sm:px-8 md:px-16 ${
          scrolled ? "premium-blur border-b border-white/5 py-4" : "bg-transparent py-6 sm:py-10"
        }`}
      >
        <div className="max-w-screen-2xl mx-auto flex justify-between items-center">
          <motion.div 
            className="flex items-center gap-5 cursor-pointer group"
            initial={{ opacity: 0, x: language === 'ar' ? 30 : -30 }}
            animate={{ opacity: 1, x: 0 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <div className="relative w-10 h-10 md:w-12 md:h-12 flex items-center justify-center">
              <div className="absolute inset-0 border border-luxury-gold rotate-45 group-hover:rotate-90 transition-transform duration-700"></div>
              <div className="absolute inset-2 border border-luxury-gold rotate-45 group-hover:-rotate-45 transition-transform duration-700 opacity-50"></div>
              <span className="text-[11px] font-black tracking-tighter text-luxury-gold">RR</span>
            </div>
            <div className="flex flex-col">
              <span className="text-sm md:text-md tracking-[0.6em] font-display uppercase font-bold text-white group-hover:text-luxury-gold transition-colors">Nusantara</span>
              <span className="text-[8px] tracking-[0.8em] font-sans uppercase text-white/30 group-hover:text-luxury-gold/50 transition-colors">Royal Raccoon</span>
            </div>
          </motion.div>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-6 lg:gap-10 text-[10px] uppercase tracking-[0.3em]">
            {navLinks.map((link, idx) => (
              <motion.a
                key={idx}
                href={link.href}
                className="text-white/50 hover:text-luxury-gold transition-colors font-medium relative group"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 * idx }}
              >
                {link.name}
                <span className="absolute -bottom-1 inset-inline-start-0 w-0 h-[1px] bg-luxury-gold transition-all duration-300 group-hover:w-full"></span>
              </motion.a>
            ))}

            {/* Language Switcher */}
            <LanguageSwitcher />

            <motion.button
              onClick={isConnected ? disconnect : toggleWallet}
              className={`px-8 py-3 border text-[10px] tracking-widest uppercase transition-all duration-300 flex items-center gap-2 group ${
                isConnected 
                ? 'border-green-500/50 text-green-500 bg-green-500/5 hover:border-red-500/50 hover:text-red-500 hover:bg-red-500/5' 
                : 'border-luxury-gold text-white bg-white/[0.02] hover:bg-luxury-gold hover:text-black'
              }`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {isConnected ? (
                <>
                  <LogOut className="w-3 h-3 hidden group-hover:block" />
                  <Wallet className="w-3 h-3 group-hover:hidden" />
                  <span className="group-hover:hidden">{address}</span>
                  <span className="hidden group-hover:block transition-all">Disconnect</span>
                </>
              ) : (
                <>
                  <Wallet className="w-3 h-3" />
                  <span>{t("nav.connect")}</span>
                </>
              )}
            </motion.button>
          </div>

          {/* Mobile Toggle */}
          <div className="flex items-center gap-3 md:hidden">
             {/* Mobile Language Button */}
            <button 
              onClick={() => setIsLangOpen(!isLangOpen)}
              className="p-2 glass rounded-lg text-white/70"
            >
              <Globe className="w-5 h-5" />
            </button>
            <button className="text-white p-2 glass rounded-lg" onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div 
              className="fixed inset-0 bg-luxury-black z-[110] flex flex-col p-8 md:hidden"
              initial={{ opacity: 0, x: language === 'ar' ? "-100%" : "100%" }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: language === 'ar' ? "-100%" : "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300, mass: 1 }}
            >
              {/* Background Accent */}
              <div className="absolute top-0 inset-inline-end-0 w-64 h-64 bg-luxury-gold/5 blur-[80px] -translate-y-1/2 translate-x-1/2 rtl:-translate-x-1/2" />
              <div className="absolute bottom-0 inset-inline-start-0 w-64 h-64 bg-luxury-purple/5 blur-[80px] translate-y-1/2 -translate-x-1/2 rtl:translate-x-1/2" />

              <div className="flex justify-between items-center mb-24">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 border border-luxury-gold rotate-45 flex items-center justify-center">
                    <span className="text-[10px] font-black tracking-tighter text-luxury-gold">RR</span>
                  </div>
                  <span className="text-sm tracking-[0.4em] font-display uppercase font-bold text-white">Nusantara</span>
                </div>
                <button className="p-3 glass rounded-full border border-white/10" onClick={() => setIsOpen(false)}>
                  <X className="w-5 h-5 text-white" />
                </button>
              </div>
              
              <div className="flex flex-col gap-10 mt-10">
                {navLinks.map((link, idx) => (
                  <motion.a
                    key={idx}
                    href={link.href}
                    className="text-4xl sm:text-5xl font-display uppercase tracking-tighter text-white/90 hover:text-luxury-gold transition-colors block"
                    onClick={() => setIsOpen(false)}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * idx + 0.2 }}
                  >
                    {link.name}
                  </motion.a>
                ))}
              </div>

              <div className="mt-auto space-y-8">
                <motion.button 
                  onClick={() => { toggleWallet(); setIsOpen(false); }}
                  className="w-full py-5 bg-luxury-gold text-black font-bold tracking-[0.4em] uppercase text-[11px] rounded-full shadow-[0_0_30px_rgba(212,175,55,0.3)]"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                >
                  {isConnected ? address : t("nav.connect")}
                </motion.button>
                
                <div className="flex justify-center gap-8 text-white/20 text-[9px] tracking-[0.4em] uppercase">
                  <span>{t("footer.privacy")}</span>
                  <span>{t("nav.manifesto")}</span>
                  <span>{t("footer.archives")}</span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Mobile Language Dropdown Overlay */}
        <AnimatePresence>
          {isLangOpen && (
            <>
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsLangOpen(false)}
                className="fixed inset-0 bg-black/60 backdrop-blur-md z-[120]"
              />
              <motion.div 
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                exit={{ y: "100%" }}
                transition={{ type: "spring", damping: 30, stiffness: 300 }}
                className="fixed bottom-0 left-0 right-0 glass border-t border-white/10 rounded-t-[2.5rem] p-8 z-[130] max-h-[80vh] overflow-y-auto"
              >
                <div className="flex justify-between items-center mb-8">
                  <h3 className="text-xs font-bold uppercase tracking-[0.3em] text-white/40">{t("nav.select_language") || "Select Language"}</h3>
                  <button onClick={() => setIsLangOpen(false)} className="p-2 glass rounded-full">
                    <X className="w-5 h-5 text-white" />
                  </button>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  {LANGUAGES.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        setLanguage(lang.code as Language);
                        setIsLangOpen(false);
                      }}
                      className={`flex items-center gap-3 p-4 rounded-2xl glass border transition-all ${
                        language === lang.code ? 'border-luxury-gold text-luxury-gold' : 'border-white/5 text-white/60'
                      }`}
                    >
                      <span className="text-2xl">{lang.flag}</span>
                      <span className="font-bold tracking-widest text-[10px] uppercase text-start leading-tight">{lang.name}</span>
                    </button>
                  ))}
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </nav>

      {/* Wallet Modal Mock */}
      <AnimatePresence>
        {isWalletOpen && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={toggleWallet}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-sm glass p-8 rounded-[2.5rem] border border-white/10 shadow-2xl overflow-hidden"
            >
               <div className="absolute top-0 inset-inline-end-0 w-32 h-32 bg-luxury-gold/5 blur-[50px] -translate-y-1/2 translate-x-1/2 rtl:-translate-x-1/2" />
               
               <div className="text-center mb-10">
                 <div className="w-16 h-16 rounded-2xl glass mx-auto flex items-center justify-center mb-4 border border-white/5">
                   <Zap className="w-8 h-8 text-luxury-gold" />
                 </div>
                 <h2 className="font-display text-2xl mb-2">{t("nav.connect")}</h2>
                 <p className="text-white/40 text-[10px] uppercase tracking-widest">Select your provider</p>
               </div>

               <div className="space-y-3">
                 <button 
                   onClick={handleConnect}
                   className="w-full group flex items-center justify-between p-4 glass rounded-2xl border border-white/5 hover:border-luxury-gold/50 transition-all text-start"
                 >
                   <div className="flex items-center gap-4">
                     <div className="w-10 h-10 rounded-xl bg-orange-500/20 flex items-center justify-center">
                       <span className="font-black text-orange-500 text-xl">M</span>
                     </div>
                     <div>
                       <span className="text-sm font-bold block">MetaMask</span>
                       <span className="text-[10px] text-white/30 uppercase tracking-[0.1em]">Recommended</span>
                     </div>
                   </div>
                   <ShieldCheck className="w-5 h-5 text-white/20 group-hover:text-luxury-gold transition-colors" />
                 </button>

                 <button className="w-full group flex items-center justify-between p-4 glass rounded-2xl border border-white/5 hover:border-luxury-gold/50 transition-all text-start opacity-30 grayscale cursor-not-allowed">
                   <div className="flex items-center gap-4">
                     <div className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center">
                       <span className="font-black text-blue-500 text-xl">C</span>
                     </div>
                     <div>
                       <span className="text-sm font-bold block">Coinbase</span>
                       <span className="text-[10px] text-white/30 uppercase tracking-[0.1em]">{t("nav.coming_soon") || "Coming Soon"}</span>
                     </div>
                   </div>
                 </button>
               </div>

               <p className="mt-8 text-center text-[9px] text-white/20 uppercase tracking-[0.3em] leading-relaxed">
                 Encrypted via 256-bit<br/>Arthropodic Protocol
               </p>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
