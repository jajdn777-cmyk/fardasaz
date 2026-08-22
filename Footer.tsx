import React, { memo } from 'react';
import { BookOpen, Send } from 'lucide-react';
import { motion } from 'motion/react';
import { useTranslation } from 'react-i18next';

const Footer = memo(function Footer() {
  const { t } = useTranslation();
  return (
    <footer id="contact" className="bg-slate-900 border-t border-slate-800 text-slate-500 pt-20 pb-10 mt-auto overflow-hidden relative selection:bg-sky-500 selection:text-white">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-sky-400 via-indigo-500 to-sky-400 bg-[length:200%_auto] animate-gradient"></div>
      <div className="absolute top-0 right-0 w-[40rem] h-[40rem] bg-sky-900/20 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[30rem] h-[30rem] bg-indigo-900/20 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-sky-400 via-blue-500 to-indigo-500"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16"
        >
          
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 text-sky-100 mb-6">
              <img src="https://i.ibb.co/gLYvLb8D/logo-rahedanesh-removebg-preview-1.png" alt="راه دانش" className="h-20 md:h-24 w-auto object-contain" />
              <span className="text-2xl font-bold tracking-tight">{t('hero_title_main')}</span>
            </div>
            <p className="text-slate-500 leading-relaxed text-sm">
              پلتفرمی مستقل و غیرانتفاعی برای دسترسی آزاد به منابع آموزشی، کتب درسی و بورسیه‌های تحصیلی برای تمام جوانان افغانستان.
            </p>
          </div>

          <div>
            <h4 className="text-slate-100 font-bold mb-6">{t('quick_links')}</h4>
            <ul className="space-y-3 text-sm">
              <li><a href="#books" className="hover:text-sky-600 transition-colors">{t('footer_textbooks')}</a></li>
              <li><a href="#scholarships" className="hover:text-sky-600 transition-colors">{t('footer_scholarships')}</a></li>
              <li><a href="#volunteer" className="hover:text-sky-600 transition-colors">{t('footer_videos')}</a></li>
              <li><a href="#mission" className="hover:text-sky-600 transition-colors">{t('footer_about')}</a></li>
            </ul>
          </div>

          <div className="lg:col-span-2 bg-slate-800/50 backdrop-blur-md p-6 rounded-2xl border border-slate-700 shadow-xl relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-sky-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <h4 className="text-slate-100 font-bold mb-4">{t('report_issue')}</h4>
            <p className="text-xs text-slate-500 mb-4 leading-relaxed">
              آیا کلاه‌برداری تحصیلی مشاهده کرده‌اید؟ یا پیشنهادی برای بهبود راه دانش دارید؟ با ما در تماس شوید.
            </p>
            <form className="flex flex-col sm:flex-row gap-3" onSubmit={(e) => e.preventDefault()}>
              <input 
                type="email" 
                placeholder={t("your_email")} 
                className="flex-1 bg-white border border-slate-200 rounded-lg px-4 py-2.5 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all"
              />
              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="bg-sky-600 hover:bg-sky-700 text-white px-6 py-2.5 rounded-lg text-sm font-bold transition-colors flex items-center justify-center gap-2 shadow-sm"
              >
                <Send className="w-4 h-4" />
                <span>{t('send_message')}</span>
              </motion.button>
            </form>
          </div>

        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="border-t border-slate-800 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-slate-500"
        >
          <div className="flex gap-4">
            <a href="#" className="hover:text-sky-600 transition-colors">{t('terms_of_use')}</a>
            <a href="#" className="hover:text-sky-600 transition-colors">{t('privacy_policy')}</a>
          </div>
          <p>© {new Date().getFullYear()} {t('copyright')}</p>
          <div className="flex items-center gap-3">
            <span className="font-medium text-slate-500">Join Telegram:</span>
            <motion.a 
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              href="#" 
              className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs font-bold hover:bg-blue-600 transition-colors"
            >
              TG
            </motion.a>
          </div>
        </motion.div>
      </div>
    </footer>
  );
});
export default Footer;