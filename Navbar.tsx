import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from './LanguageSwitcher';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { t } = useTranslation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname, location.hash]);

  const navLinks = [
    { name: t('nav_home'), href: '/' },
    { name: t('nav_about'), href: '/#about' },
    { name: t('nav_classes'), href: '/volunteer' },
    { name: t('nav_kankor'), href: '/kankor' },
    { name: t('nav_library'), href: '/library' },
    { name: t('nav_scholarships'), href: '/scholarships' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('/#')) {
      if (location.pathname === '/') {
        e.preventDefault();
        const id = href.replace('/#', '');
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
          setIsMobileMenuOpen(false);
          window.history.replaceState(null, '', href);
        }
      } else {
        setIsMobileMenuOpen(false);
      }
    } else {
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 100, damping: 20 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled || isMobileMenuOpen ? 'bg-white shadow-sm border-b border-sky-100 py-1 md:py-2' : 'bg-transparent py-2 md:py-3 text-white'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          
          {/* Brand Logo - Right Side (RTL) */}
          <Link to="/" className="flex items-center gap-3 shrink-0">
            <img 
              src="https://i.ibb.co/gLYvLb8D/logo-rahedanesh-removebg-preview-1.png" 
              alt="راه دانش" 
              className="h-16 sm:h-20 lg:h-24 w-auto object-contain transition-all duration-300" 
            />
            <span className="sr-only">راه دانش</span>
          </Link>

          {/* Desktop Navigation - Hidden on smaller screens (below xl) */}
          <div className="hidden xl:flex items-center gap-6 2xl:gap-8 relative">
            {navLinks.map((link) => {
              const isActive = (location.pathname === link.href || (location.pathname === '/' && location.hash === link.href.replace('/', '')));
              return (
                <Link
                  key={link.name}
                  to={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={`relative px-2 py-1 text-base font-bold transition-colors hover:text-sky-500 whitespace-nowrap ${
                    isActive
                       ? (isScrolled ? 'text-sky-600' : 'text-white')
                       : (isScrolled ? 'text-slate-600' : 'text-white/90')
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <motion.div
                      layoutId="nav-indicator"
                      className={`absolute -bottom-1 left-0 right-0 h-0.5 rounded-full ${isScrolled ? 'bg-sky-600' : 'bg-white'}`}
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </div>
          
          {/* Desktop Actions - Hidden on smaller screens */}
          <div className="hidden xl:flex items-center gap-4 shrink-0">
            <LanguageSwitcher isScrolled={isScrolled} />
            <Link to="/register" className="shrink-0">
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 bg-sky-600 hover:bg-sky-700 text-white rounded-full text-base font-bold shadow-md shadow-sky-200 transition-colors shrink-0 whitespace-nowrap"
              >
                {t('register_rahe_danesh')}
              </motion.button>
            </Link>
          </div>

          {/* Mobile Menu Toggle - Visible below xl */}
          <div className="xl:hidden flex items-center gap-4 shrink-0">
            <Link to="/register" className="shrink-0 hidden sm:block">
              <button className="px-5 py-2.5 bg-sky-600 hover:bg-sky-700 text-white rounded-full text-sm font-bold shadow-md transition-colors whitespace-nowrap">
                {t('register')}
              </button>
            </Link>
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`p-2 rounded-lg transition-colors ${isScrolled || isMobileMenuOpen ? 'text-sky-900 hover:bg-sky-50' : 'text-white hover:bg-white/20'}`}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="xl:hidden bg-white border-t border-sky-100 overflow-hidden"
          >
            <div className="px-4 py-6 space-y-4 shadow-inner flex flex-col">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={`block px-4 py-3 rounded-xl text-base font-bold transition-colors ${
                    (location.pathname === link.href || (location.pathname === '/' && location.hash === link.href.replace('/', ''))) 
                      ? 'bg-sky-50 text-sky-700' 
                      : 'text-slate-700 hover:bg-slate-50 hover:text-sky-600'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              
              <div className="pt-4 mt-2 border-t border-slate-100 flex flex-col gap-4">
                <div className="flex items-center justify-center gap-2 px-4 py-3 w-full">
                  <LanguageSwitcher isScrolled={true} />
                </div>
                <Link to="/register" className="w-full sm:hidden">
                  <button className="w-full px-4 py-4 bg-sky-600 hover:bg-sky-700 text-white rounded-xl text-base font-bold shadow-md transition-colors">
                    {t('register_rahe_danesh')}
                  </button>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
