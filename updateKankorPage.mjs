import fs from 'fs';
const file = 'src/pages/KankorPage.tsx';
let content = fs.readFileSync(file, 'utf8');

const replacement = `import React from 'react';
import { BookOpen, GraduationCap, PlayCircle, Download } from 'lucide-react';
import { motion } from 'motion/react';
import { useTranslation } from 'react-i18next';

export default function KankorPage() {
  const { t } = useTranslation();

  const materials = [
    { title: t('past_forms'), type: 'PDF', icon: <Download /> },
    { title: t('intensive_math'), type: t('video'), icon: <PlayCircle /> },
    { title: t('physics_chem_notes'), type: 'PDF', icon: <Download /> },
    { title: t('major_selection'), type: t('article'), icon: <BookOpen /> },
  ];

  return (
    <section className="py-24 bg-slate-50 min-h-screen relative overflow-hidden">
      {/* Background Orbs */}
      <motion.div
        animate={{ y: [0, -30, 0], scale: [1, 1.1, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-20 right-10 w-96 h-96 bg-sky-200/40 rounded-full blur-[100px] pointer-events-none z-0"
      />
      <motion.div
        animate={{ y: [0, 40, 0], scale: [1, 1.05, 1] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute bottom-10 left-10 w-80 h-80 bg-indigo-200/30 rounded-full blur-[100px] pointer-events-none z-0"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.5, rotate: -180 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            className="w-24 h-24 bg-gradient-to-br from-sky-100 to-indigo-100 rounded-3xl flex items-center justify-center text-sky-600 mx-auto mb-6 shadow-xl shadow-sky-200/50 border border-sky-200/50"
          >
            <GraduationCap className="w-12 h-12" />
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6 tracking-tight"
          >
            {t('kankor_title')}
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed"
          >
            {t('kankor_subtitle')}
          </motion.p>
        </div>

        <motion.div 
          initial="hidden"
          animate="show"
          variants={{
            hidden: { opacity: 0 },
            show: {
              opacity: 1,
              transition: { staggerChildren: 0.15 }
            }
          }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {materials.map((item, idx) => (
            <motion.div
              key={idx}
              variants={{
                hidden: { opacity: 0, y: 40, scale: 0.9 },
                show: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 300, damping: 24 } }
              }}
              whileHover={{ y: -10, scale: 1.03, boxShadow: "0 20px 40px -10px rgba(56, 189, 248, 0.25)" }}
              className="bg-white/80 backdrop-blur-sm p-8 rounded-[2rem] border border-slate-100 shadow-sm transition-all text-center flex flex-col items-center group relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-b from-sky-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative z-10">
                <div className="w-16 h-16 bg-sky-50 text-sky-600 rounded-2xl flex items-center justify-center mb-6 mx-auto group-hover:bg-sky-600 group-hover:text-white transition-colors duration-300 shadow-sm border border-sky-100 group-hover:border-transparent">
                  {item.icon}
                </div>
                <h3 className="font-bold text-slate-900 mb-3 text-lg group-hover:text-sky-700 transition-colors">{item.title}</h3>
                <span className="text-xs font-bold text-slate-500 bg-slate-100 px-4 py-1.5 rounded-full mb-6 inline-block">
                  {item.type}
                </span>
              </div>
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="mt-auto relative z-10 w-full py-3 bg-slate-50 text-sky-600 font-bold text-sm rounded-xl hover:bg-sky-500 hover:text-white transition-colors border border-sky-100 hover:border-transparent"
              >
                {t('view_download')}
              </motion.button>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}`;

fs.writeFileSync(file, replacement);
console.log('updated KankorPage');
