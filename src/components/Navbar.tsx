import { motion, AnimatePresence } from "motion/react";
<<<<<<< HEAD
import { Menu, X, Wallet, Zap, ShieldCheck, LogOut, Globe } from "lucide-react";
import { useState, useEffect } from "react";
import { useTranslation } from "../context/LanguageContext";
import { useWallet } from "../context/WalletContext";
import { Language, LANGUAGES } from "../lib/translations";
import LanguageSwitcher from "./LanguageSwitcher";
import Container from "../layout/Container";

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
        className={`fixed top-0 inset-inline-0 transition-all duration-700 z-[100] ${
          scrolled ? "premium-blur border-b border-white/5 py-4" : "bg-transparent py-6 sm:py-10"
        }`}
      >
        <Container maxW="max-w-screen-xl" className="flex justify-between items-center">
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
        </Container>

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
=======
import { Menu, X, Globe, Zap, ShieldCheck, ChevronDown, ExternalLink, Copy, LogOut } from "lucide-react";
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
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="absolute top-full left-0 w-full bg-bg-primary/95 backdrop-blur-3xl border-b border-border-soft z-[40] overflow-hidden shadow-2xl"
      onMouseLeave={onClose}
    >
      <div className="max-w-7xl mx-auto px-8 py-12">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h3 className="text-accent-gold text-xs font-bold tracking-[0.4em] uppercase mb-2">{t("collection.badge")}</h3>
            <p className="text-text-secondary text-[10px] uppercase tracking-widest leading-none">{t("collection.adjust_filters")}</p>
          </div>
          <Link to={`/${activeLink.toLowerCase()}`} onClick={onClose} className="text-text-secondary hover:text-text-primary text-[10px] uppercase tracking-[0.2em] flex items-center gap-2 group transition-colors">
            {t("nav.all")} <ChevronDown className="w-3 h-3 -rotate-90 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {nfts.map((nft, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              className="group relative bg-bg-secondary rounded-2xl p-3 border border-border-soft hover:border-accent-gold/30 transition-all duration-500 overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1"
            >
              <div className="aspect-square rounded-xl overflow-hidden mb-4 relative">
                <SafeImage src={nft.img} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute top-2 right-2 px-2 py-1 rounded bg-bg-primary/60 backdrop-blur-md border border-border-soft">
                   <span className="text-[8px] font-bold text-text-primary uppercase tracking-tighter">{t(`rarity.${nft.rarity.toLowerCase()}`)}</span>
                </div>
              </div>
              <h4 className="text-text-primary font-display text-[12px] tracking-widest mb-1 uppercase">{nft.name}</h4>
              <div className="flex justify-between items-center">
                <span className="text-[10px] text-accent-gold font-bold">{nft.price} ETH</span>
                <button className="text-[9px] uppercase tracking-widest text-text-muted hover:text-text-primary transition-colors">{t("collection.inspect")}</button>
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
  const { isConnected, address, balance, disconnect } = useWallet();
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
    if (isRoot) return scrolled ? "glass-navbar glass-premium shadow-premium" : "bg-transparent";
    return scrolled ? "glass-navbar glass-premium shadow-premium" : "glass-premium";
  };

  const buttonClass = `
    w-10 h-10 flex items-center justify-center rounded-xl bg-bg-card border border-border-soft backdrop-blur-md 
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
          <Link to="/" className="flex items-center gap-3 cursor-pointer group hover:opacity-80 transition duration-300">
            <div className="relative w-10 h-10 flex items-center justify-center transition-all duration-700 group-hover:rotate-12 group-hover:scale-110">
              <SafeImage 
                src="https://ivory-magnificent-caterpillar-957.mypinata.cloud/ipfs/bafkreig3ck347noh2ur3oi2amnfpubycc7mmdleexjld7ggwpp7paiwwtq" 
                className="w-full h-full object-contain relative z-10 filter drop-shadow-[0_0_8px_rgba(212,175,55,0.4)]"
              />
            </div>
            <div className="hidden sm:flex flex-col">
              <span className="text-[12px] font-black tracking-[0.2em] text-text-primary leading-none font-display uppercase italic interactive-gold">NUSANTARA</span>
              <span className="text-[8px] font-bold tracking-[0.4em] text-accent-gold leading-none mt-1 opacity-80 group-hover:opacity-100 transition-opacity uppercase interactive-gold">ROYAL RACCOON</span>
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
                  className={`text-[10px] font-bold uppercase tracking-[0.3em] transition-all duration-300 py-2 block ${
                    location.pathname === link.path ? "text-accent-gold" : "text-text-muted hover:text-text-primary"
                  }`}
                >
                  {link.name}
                  <motion.span 
                    className="absolute bottom-0 left-0 h-[1px] bg-accent-gold"
                    initial={false}
                    animate={{ width: location.pathname === link.path || hoveredLink === link.key ? "100%" : "0%" }}
                    transition={{ duration: 0.3 }}
                  />
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
            <div className="hidden md:flex items-center gap-2">
              {isConnected ? (
                <div className="relative">
                  <button 
                    onClick={() => setIsWalletMenuOpen(!isWalletMenuOpen)}
                    className="flex items-center gap-3 pl-4 pr-1.5 py-1.5 rounded-2xl bg-bg-card border border-border-soft hover:bg-bg-secondary transition-all group"
                  >
                    <div className="flex flex-col items-end mr-2 text-text-primary">
                      <span className="text-[9px] font-bold font-mono tracking-tighter opacity-90">
                        {address?.slice(0, 6)}...{address?.slice(-4)}
                      </span>
                      <span className="text-[8px] font-bold text-accent-gold uppercase tracking-[0.1em]">{balance} ETH</span>
                    </div>
                    <div className="w-8 h-8 rounded-xl overflow-hidden bg-gradient-to-br from-purple-500/50 to-accent-gold/50 flex items-center justify-center border border-white/20 group-hover:scale-105 transition-transform">
                      <Zap className="w-4 h-4 text-white" />
                    </div>
                  </button>

                  <AnimatePresence>
                    {isWalletMenuOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        className="absolute top-full right-0 mt-3 w-64 bg-bg-secondary border border-border-soft rounded-2xl p-4 shadow-2xl z-[60] overflow-hidden backdrop-blur-2xl"
                      >
                         <div className="absolute inset-0 bg-gradient-to-b from-accent-gold/5 to-transparent pointer-events-none" />
                         <div className="relative space-y-2">
                           <div className="px-3 py-4 mb-2 bg-bg-primary/50 rounded-xl border border-border-soft text-text-primary">
                             <p className="text-[8px] uppercase tracking-widest opacity-30 mb-2">Connected Address</p>
                             <div className="opacity-80 font-mono text-[10px]">
                                <span>{address}</span>
                             </div>
                           </div>

                           <button className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg hover:bg-bg-primary/50 transition-colors text-[10px] uppercase tracking-widest text-text-muted hover:text-text-primary">
                             <span className="flex items-center gap-2"><Copy className="w-3 h-3" /> {t("details.archive_id")}</span>
                           </button>
                           <button className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg hover:bg-bg-primary/50 transition-colors text-[10px] uppercase tracking-widest text-text-muted hover:text-text-primary">
                             <span className="flex items-center gap-2"><ExternalLink className="w-3 h-3" /> Etherscan</span>
                           </button>
                           <div className="h-[1px] bg-border-soft my-2" />
                           <button 
                            onClick={() => disconnect()}
                            className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg hover:bg-red-500/10 transition-colors text-[10px] uppercase tracking-widest text-red-500"
                           >
                             <span className="flex items-center gap-2"><LogOut className="w-3 h-3" /> {t("details.exit")}</span>
                           </button>
                         </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <button 
                  onClick={() => setIsWalletMenuOpen(true)}
                  className="connect-wallet text-[10px] uppercase tracking-[0.3em]"
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
>>>>>>> 17e96eb (first commit)
                  {LANGUAGES.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        setLanguage(lang.code as Language);
                        setIsLangOpen(false);
                      }}
<<<<<<< HEAD
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
=======
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

>>>>>>> 17e96eb (first commit)
