import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'motion/react';

const testimonials = [
    {
      name: 'فاطمه احمدی',
      role: 'دانش‌آموز صنف دهم',
      text: 'راه دانش به من کمک کرد تا در این روزهای سخت، امیدم را برای ادامه تحصیل از دست ندهم. کلاس‌های آنلاین عالی هستند.',
    },
    {
      name: 'احمد رضایی',
      role: 'دانش‌آموز کانکوری',
      text: 'مواد درسی کانکور و آزمون‌های آزمایشی که در اینجا پیدا کردم، بسیار جامع و کاربردی بود. از همه اساتید ممنونم.',
    },
    {
      name: 'مریم سادات',
      role: 'دانش‌آموز صنف دوازدهم',
      text: 'دسترسی به تمام کتاب‌های درسی به صورت یکجا و رایگان خیلی به من کمک کرده است. ممنون از راه دانش.',
    }
  ];

const Testimonials = memo(function Testimonials() {
  const { t } = useTranslation();


  return (
    <section className="py-24 bg-slate-50 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl font-bold text-slate-900 mb-4">{t('testimonials_title')}</h2>
          <p className="text-slate-600 max-w-2xl mx-auto">نظرات برخی از دانش‌آموزانی که از خدمات راه دانش استفاده کرده‌اند.</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((item, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.15 }}
              whileHover={{ y: -10, scale: 1.02 }} className="bg-white p-8 rounded-3xl shadow-md hover:shadow-2xl transition-all duration-300 border border-slate-100 relative group overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-sky-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="text-sky-400 text-6xl font-serif absolute top-4 right-6 opacity-20 group-hover:text-sky-500 group-hover:scale-110 transition-transform duration-300 z-10">"</div>
              <p className="text-slate-700 leading-relaxed relative z-10 mb-6 italic">« {item.text} »</p>
              <div className="flex items-center gap-4 border-t border-slate-50 pt-6">
                <div className="w-12 h-12 bg-gradient-to-br from-sky-100 to-sky-200 rounded-full flex items-center justify-center text-sky-800 font-bold shadow-inner">
                  {item.name[0]}
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-base">{item.name}</h4>
                  <p className="text-sm text-sky-600 font-medium">{item.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
});
export default Testimonials;