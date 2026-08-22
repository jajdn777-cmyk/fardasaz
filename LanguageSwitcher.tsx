import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Globe, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const languages = [
  { code: 'fa', name: 'فارسی', dir: 'rtl' },
  { code: 'ps', name: 'پښتو', dir: 'rtl' },
  { code: 'uz', name: 'Oʻzbekcha', dir: 'ltr' },
  { code: 'en', name: 'English', dir: 'ltr' }
];

export default function LanguageSwitcher({ isScrolled = false }: { isScrolled?: boolean }) {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  const currentLang = languages.find(l => l.code === i18n.language) || languages[0];

  const changeLanguage = (code: string, dir: string) => {
    i18n.changeLanguage(code);
    document.documentElement.dir = dir;
    document.documentElement.lang = code;
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-1.5 font-medium transition-colors ${isScrolled ? 'text-slate-600 hover:text-sky-600' : 'text-white/90 hover:text-white'}`}
      >
        <Globe className="w-5 h-5" />
        <span>{currentLang.name}</span>
        <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute top-full mt-2 w-32 bg-white rounded-xl shadow-lg border border-slate-100 py-2 z-50 ltr:right-0 rtl:left-0"
          >
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => changeLanguage(lang.code, lang.dir)}
                className={`w-full text-start px-4 py-2 text-sm font-medium transition-colors hover:bg-slate-50 ${
                  i18n.language === lang.code ? 'text-sky-600 bg-sky-50' : 'text-slate-700'
                }`}
              >
                {lang.name}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
