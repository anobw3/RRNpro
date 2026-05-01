import { motion, AnimatePresence } from "motion/react";
import { Menu, X, Globe, Zap, ShieldCheck, ChevronDown, ExternalLink, Copy, LogOut, ArrowRight } from "lucide-react";
import { useState, useEffect, useCallback, memo, useRef } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useTranslation } from "../context/LanguageContext";
import { useWallet } from "../context/WalletContext";
import { useTheme } from "../context/ThemeContext";
import { Language, LANGUAGES } from "../lib/translations";
import ThemeToggle from "./ThemeToggle";
import LanguageSwitcher from "./LanguageSwitcher";
import SafeImage from "./ui/SafeImage";

const MOCK_NFTS = {
  Archive: [
    { name: "Royal Void #001", price: "4.2", rarity: "Legendary", img: "https://ivory-magnificent-caterpillar-957.mypinata.cloud/ipfs/bafkreiay7unrre72iow72q2sqjrvuuev6iiz743xgn6kdzsm3z26ix2lqu" },
    { name: "Imperial Guard", price: "1.8", rarity: "Epic", img: "https://ivory-magnificent-caterpillar-957.mypinata.cloud/ipfs/bafkreigv6uay2w2snh6x7b6l3xnzx6y3z2xt6n2xnzx6y3z2xt6n2xnz" },
    { name: "Solar Monarch", price: "12.5", rarity: "Divine", img: "https://ivory-magnificent-caterpillar-957.mypinata.cloud/ipfs/bafkreic7nzx6y3z2xt6n2xnzx6y3z2xt6n2xnz" },
  ],
  Protocol: [
    { name: "Core Node Alpha", price: "0.8", rarity: "Common", img: "https://ivory-magnificent-caterpillar-957.mypinata.cloud/ipfs/bafkreig3ck347noh2ur3oi2amnfpubycc7mmdleexjld7ggwpp7paiwwtq" },
    { name: "Neural Bridge", price: "2.1", rarity: "Rare", img: "https://ivory-magnificent-caterpillar-957.mypinata.cloud/ipfs/bafkreic7nzx6y3z2xt6n2xnzx6y3z2xt6n2xnz" },
  ],
  Governance: [
    { name: "Senate Seal", price: "5.0", rarity: "Mythic", img: "https://ivory-magnificent-caterpillar-957.mypinata.cloud/ipfs/bafkreigv6uay2w2snh6x7b6l3xnzx6y3z2xt6n2xnzx6y3z2xt6n2xnz" },
    { name: "Voter Badge", price: "0.1", rarity: "Common", img: "https://ivory-magnificent-caterpillar-957.mypinata.cloud/ipfs/bafkreig3ck347noh2ur3oi2amnfpubycc7mmdleexjld7ggwpp7paiwwtq" },
  ],
};

const MegaMenu = ({ activeLink, onClose }: { activeLink: string | null, onClose: () => void }) => {
  const { t } = useTranslation();
  if (!activeLink || !MOCK_NFTS[activeLink as keyof typeof MOCK_NFTS]) return null;

  const nfts = MOCK_NFTS[activeLink as keyof typeof MOCK_NFTS];

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 15 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="absolute top-full left-0 w-full bg-bg-primary/95 backdrop-blur-3xl border-b border-border-soft z-[40] overflow-hidden shadow-3xl"
      onMouseLeave={onClose}
    >
      <div className="max-w-7xl mx-auto px-10 py-16">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h3 className="text-gold text-[10px] font-black tracking-[0.4em] uppercase mb-3">{activeLink} Archive</h3>
            <p className="text-text-muted text-[11px] uppercase tracking-widest leading-none font-light opacity-60">Authentication required for privileged access</p>
          </div>
          <Link to={`/${activeLink.toLowerCase()}`} onClick={onClose} className="text-text-muted hover:text-gold text-[10px] font-black uppercase tracking-[0.3em] flex items-center gap-3 group transition-all">
            {t("nav.all") || "Global Registry"} <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-2 transition-transform duration-500" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {nfts.map((nft, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.08 }}
              className="group relative bg-bg-card rounded-[28px] p-4 border border-border-soft hover:border-gold/30 transition-all duration-700 shadow-sm hover:shadow-2xl hover:-translate-y-2"
            >
              <div className="aspect-square rounded-2xl overflow-hidden mb-5 relative bg-bg-primary/50">
                <SafeImage src={nft.img} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 opacity-80 group-hover:opacity-100" />
                <div className="absolute top-3 right-3 px-3 py-1.5 rounded-full bg-bg-primary/60 backdrop-blur-md border border-border-soft">
                   <span className="text-[8px] font-black text-text-primary uppercase tracking-widest">{t(`rarity.${nft.rarity.toLowerCase()}`) || nft.rarity}</span>
                </div>
              </div>
              <h4 className="text-text-primary font-display text-[13px] tracking-widest mb-2 uppercase font-medium">{nft.name}</h4>
              <div className="flex justify-between items-center">
                <span className="text-[11px] text-gold font-black tracking-tighter">{nft.price} ETH</span>
                <button className="text-[9px] font-black uppercase tracking-[0.2em] text-text-muted hover:text-gold transition-all">{t("collection.inspect") || "Verify"}</button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isWalletMenuOpen, setIsWalletMenuOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const { isConnected, address, balance, disconnect, connect } = useWallet();
  const { language, setLanguage, t } = useTranslation();
  const { theme } = useTheme();
  
  const location = useLocation();
  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
    setIsWalletMenuOpen(false);
  }, [location.pathname]);

  // Click outside to close menus
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setIsWalletMenuOpen(false);
        setIsLangOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const navLinks = [
    { name: t("nav.collection"), path: "/archive", key: "Archive" },
    { name: t("nav.marketplace"), path: "/protocol", key: "Protocol" },
    { name: t("footer.governance"), path: "/governance", key: "Governance" },
    { name: t("nav.manifesto"), path: "/manifesto", key: "Manifesto" },
    ...(isConnected ? [{ name: "Portfolio", path: "/#portfolio", key: "Portfolio" }] : []),
  ];

  // Dynamic navbar styling based on route
  const getNavStyles = () => {
    const isRoot = location.pathname === "/";
    if (scrolled) return "bg-bg-primary/80 backdrop-blur-xl border-b border-border-soft shadow-lg py-3";
    return isRoot ? "bg-transparent py-6" : "bg-bg-primary/40 backdrop-blur-md border-b border-border-soft py-5";
  };

  const buttonClass = `
    w-10 h-10 flex items-center justify-center rounded-full bg-bg-card border border-border-soft backdrop-blur-md 
    transition-all duration-300 ease-out hover:bg-bg-secondary hover:scale-105 text-text-muted hover:text-text-primary
  `;

  return (
    <div ref={navRef}>
      <motion.nav 
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 border-b border-border-soft ${getNavStyles()} ${scrolled ? "py-3" : "py-5"}`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between z-10 relative">
          {/* LOGO */}
          <Link to="/" className="flex items-center gap-4 cursor-pointer group hover:opacity-80 transition duration-300">
            <div className="relative w-12 h-12 flex items-center justify-center transition-all duration-700 group-hover:scale-110">
              <SafeImage 
                src="https://ivory-magnificent-caterpillar-957.mypinata.cloud/ipfs/bafkreig3ck347noh2ur3oi2amnfpubycc7mmdleexjld7ggwpp7paiwwtq" 
                className="w-full h-full object-contain relative z-10 filter drop-shadow-[0_0_15px_rgba(212,175,55,0.3)]"
              />
            </div>
            <div className="hidden sm:flex flex-col">
              <span className="text-[13px] font-black tracking-[0.3em] text-text-primary leading-none font-display uppercase tracking-widest luxury-text-glow">NUSANTARA</span>
              <span className="text-[8px] font-black tracking-[0.5em] text-gold/60 leading-none mt-2 transition-opacity uppercase">ARCHIPELAGO LEGACY</span>
            </div>
          </Link>

          {/* Desktop Links with Mega Menu Hover */}
          <ul className="hidden lg:flex items-center gap-10 px-8" onMouseLeave={() => setHoveredLink(null)}>
            {navLinks.map((link) => (
              <li 
                key={link.path} 
                className="relative"
                onMouseEnter={() => setHoveredLink(link.key)}
              >
                <Link
                  to={link.path}
                  className={`text-[9px] font-black uppercase tracking-[0.4em] transition-all duration-500 py-3 block ${
                    location.pathname === link.path ? "text-gold" : "text-text-muted hover:text-text-primary"
                  }`}
                >
                  {link.name}
                  <motion.span 
                    className="absolute bottom-0 left-0 h-px bg-gold"
                    initial={false}
                    animate={{ width: location.pathname === link.path ? "100%" : "0%" }}
                    transition={{ duration: 0.5 }}
                  />
                  {hoveredLink === link.key && location.pathname !== link.path && (
                    <motion.span 
                      layoutId="nav-underline"
                      className="absolute bottom-0 left-0 w-full h-px bg-gold/30"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                </Link>
              </li>
            ))}
          </ul>

          {/* RIGHT BUTTONS */}
          <div className="flex items-center gap-6">
            <div className="hidden lg:block">
              <ThemeToggle />
            </div>

            <div className="hidden md:block">
              <LanguageSwitcher />
            </div>

            {/* Wallet Info Display */}
            <div className="hidden md:flex items-center gap-3">
              {isConnected ? (
                <div className="relative">
                  <button 
                    onClick={() => setIsWalletMenuOpen(!isWalletMenuOpen)}
                    className="flex items-center gap-5 pl-6 pr-1.5 py-1.5 rounded-full bg-bg-card border border-border-soft hover:border-gold/30 transition-all group shadow-sm"
                  >
                    <div className="flex flex-col items-end mr-3">
                      <span className="text-[11px] font-black font-mono tracking-tighter text-text-primary">
                        {address?.slice(0, 6)}...{address?.slice(-4)}
                      </span>
                      <span className="text-[9px] font-black text-gold uppercase tracking-[0.2em]">{balance} ETH</span>
                    </div>
                    <div className="w-10 h-10 rounded-full overflow-hidden bg-gold flex items-center justify-center border border-white/20 group-hover:scale-105 transition-transform duration-500 shadow-lg">
                      <Zap className="w-4 h-4 text-black fill-black" />
                    </div>
                  </button>

                  <AnimatePresence>
                    {isWalletMenuOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 15, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 15, scale: 0.98 }}
                        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                        className="absolute top-full right-0 mt-4 w-72 bg-bg-primary border border-border-soft rounded-[32px] p-6 shadow-3xl z-[60] overflow-hidden backdrop-blur-3xl"
                      >
                         <div className="absolute inset-0 bg-gold/5 pointer-events-none" />
                         <div className="relative space-y-3">
                           <div className="px-5 py-6 mb-4 bg-bg-card rounded-2xl border border-border-soft text-text-primary">
                             <p className="text-[9px] font-black uppercase tracking-[0.4em] opacity-40 mb-3">Sovereign Address</p>
                             <div className="opacity-90 font-mono text-[11px] break-all leading-relaxed tracking-tighter">
                                <span>{address}</span>
                             </div>
                           </div>

                           <button className="w-full flex items-center justify-between px-4 py-3 rounded-xl hover:bg-bg-card transition-all text-[9px] font-black uppercase tracking-[0.3em] text-text-muted hover:text-gold group/item">
                             <span className="flex items-center gap-3 transition-transform group-hover/item:translate-x-1"><Copy className="w-3.5 h-3.5" /> {t("details.archive_id") || "Copy Identifier"}</span>
                           </button>
                           <button className="w-full flex items-center justify-between px-4 py-3 rounded-xl hover:bg-bg-card transition-all text-[9px] font-black uppercase tracking-[0.3em] text-text-muted hover:text-gold group/item">
                             <span className="flex items-center gap-3 transition-transform group-hover/item:translate-x-1"><ExternalLink className="w-3.5 h-3.5" /> Blockchain Explorer</span>
                           </button>
                           
                           <div className="h-px bg-border-soft my-4 mx-2" />
                           
                           <button 
                            onClick={() => disconnect()}
                            className="w-full flex items-center justify-between px-4 py-3 rounded-xl hover:bg-red-500/10 transition-all text-[9px] font-black uppercase tracking-[0.3em] text-red-500 group/item"
                           >
                             <span className="flex items-center gap-3 transition-transform group-hover/item:translate-x-1"><LogOut className="w-3.5 h-3.5" /> {t("details.exit") || "Sever Connection"}</span>
                           </button>
                         </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <button 
                  onClick={() => connect()}
                  className="btn-primary !px-10 !py-4"
                >
                  {t("nav.connect")}
                </button>
              )}
            </div>

            <button 
              onClick={() => setIsLangOpen(!isLangOpen)}
              className={`${buttonClass} md:hidden`}
              aria-label="Language Selector"
            >
              <Globe className="w-5 h-5" />
            </button>

            <button 
              onClick={() => setIsOpen(!isOpen)}
              className={`${buttonClass} lg:hidden`}
              aria-label="Menu Toggle"
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mega Menu Dropdown */}
        <AnimatePresence>
          {hoveredLink && <MegaMenu activeLink={hoveredLink} onClose={() => setHoveredLink(null)} />}
        </AnimatePresence>

        {/* Mobile Dropdown Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden absolute top-full left-0 w-full bg-bg-primary/98 border-b border-border-soft overflow-hidden backdrop-blur-2xl text-text-primary"
            >
              <ul className="flex flex-col p-8 gap-6 max-w-7xl mx-auto">
                {navLinks.map((link) => (
                  <li key={link.path}>
                    <Link
                      to={link.path}
                      className={`text-2xl font-display uppercase tracking-[0.2em] transition-all duration-300 block ${
                        location.pathname === link.path ? "text-accent-gold" : "opacity-40 hover:opacity-100"
                      }`}
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
                
                <li className="pt-6 border-t border-border-soft space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-widest opacity-40">Display Mode</span>
                  </div>
                  <ThemeToggle />
                </li>

                <li className="pt-6 border-t border-border-soft grid grid-cols-2 gap-4">
                  {[
                    { name: t("footer.digital_laws"), path: "/law" },
                    { name: t("footer.beast_code"), path: "/code" },
                    { name: t("footer.security_audit"), path: "/security" },
                    { name: t("footer.transparency"), path: "/transparency" }
                  ].map((subLink) => (
                    <Link
                      key={subLink.path}
                      to={subLink.path}
                      className={`text-[10px] uppercase tracking-[0.2em] font-black opacity-30 hover:text-accent-gold transition-colors ${
                        location.pathname === subLink.path ? "text-accent-gold" : ""
                      }`}
                    >
                      {subLink.name}
                    </Link>
                  ))}
                </li>
                {isConnected ? (
                  <li className="pt-6 border-t border-border-soft flex items-center justify-between">
                    <div className="flex flex-col">
                       <span className="text-[10px] font-mono opacity-50">{address?.slice(0, 10)}...</span>
                       <span className="text-xl font-bold text-accent-gold">{balance} ETH</span>
                    </div>
                    <button onClick={() => disconnect()} className="w-12 h-12 rounded-xl bg-red-500/10 flex items-center justify-center border border-red-500/20">
                      <LogOut className="w-5 h-5 text-red-500" />
                    </button>
                  </li>
                ) : (
                  <li className="pt-4">
                    <button onClick={() => setIsOpen(false)} className="w-full py-5 rounded-2xl connect-wallet text-white font-bold uppercase tracking-[0.4em] text-xs">{t("nav.connect")}</button>
                  </li>
                )}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Language Selection Modal */}
      <AnimatePresence>
        {isLangOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsLangOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-md z-[60]"
            />
            <motion.div 
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed bottom-0 left-0 right-0 bg-bg-primary border-t border-border-soft rounded-t-[2.5rem] p-8 pb-12 z-[70] max-h-[85vh] overflow-y-auto font-display text-text-primary"
            >
              <div className="max-w-xl mx-auto">
                <div className="flex justify-between items-center mb-10">
                  <h3 className="text-[10px] font-bold uppercase tracking-[0.4em] opacity-40">{t("nav.select_language")}</h3>
                  <button onClick={() => setIsLangOpen(false)} className={buttonClass}>
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {LANGUAGES.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        setLanguage(lang.code as Language);
                        setIsLangOpen(false);
                      }}
                      className={`flex items-center justify-between p-6 rounded-2xl transition-all border ${
                        language === lang.code 
                        ? 'bg-accent-gold/10 border-accent-gold text-accent-gold' 
                        : 'bg-bg-card border-transparent opacity-60 hover:opacity-100 hover:bg-bg-secondary'
                      }`}
                    >
                      <span className="font-bold tracking-widest text-[10px] uppercase">{lang.name}</span>
                      {language === lang.code && <div className="w-1.5 h-1.5 rounded-full bg-accent-gold" />}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default memo(Navbar);

