import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { HeartHandshake } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import Hero from '../components/Hero';
import Mission from '../components/Mission';
import Testimonials from '../components/Testimonials';
import VolunteerModal from '../components/VolunteerModal';

export default function HomePage() {
  const location = useLocation();
  const { t } = useTranslation();
  const [isVolunteerModalOpen, setIsVolunteerModalOpen] = useState(false);

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    }
  }, [location]);

  return (
    <>
      <Hero />
      <Mission />
      
      {/* Volunteer Call to Action Section */}
      <section className="py-24 bg-sky-900 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-[url('https://i.ibb.co/3kXJXZQ/noise.png')] opacity-10 mix-blend-overlay"></div>
        <motion.div
          animate={{ y: [0, -30, 0], scale: [1, 1.1, 1] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-10 right-20 w-[30rem] h-[30rem] bg-sky-500/20 rounded-full blur-[100px] pointer-events-none"
        />
        <motion.div
          animate={{ y: [0, 40, 0], scale: [1, 1.05, 1] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute bottom-10 left-20 w-[40rem] h-[40rem] bg-indigo-500/20 rounded-full blur-[120px] pointer-events-none"
        />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            className="w-24 h-24 bg-sky-800 border border-sky-600 rounded-3xl flex items-center justify-center text-sky-300 mx-auto mb-8 shadow-2xl shadow-sky-900/50"
          >
            <HeartHandshake className="w-12 h-12" />
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-extrabold text-white mb-6 leading-tight"
          >
            به جمع اساتید داوطلب ما بپیوندید
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-xl text-sky-100 max-w-3xl mx-auto mb-10 leading-relaxed font-medium"
          >
            اگر تخصص و تجربه‌ای دارید که می‌تواند مسیر روشنی برای آینده جوانان و دانش‌آموزان افغانستان بسازد، ما به شما نیاز داریم.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <motion.button 
              whileHover={{ scale: 1.05, boxShadow: "0 10px 30px -10px rgba(56, 189, 248, 0.5)" }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsVolunteerModalOpen(true)}
              className="w-full sm:w-auto px-10 py-4 bg-sky-500 hover:bg-sky-400 text-white rounded-2xl text-lg font-bold transition-all shadow-lg shadow-sky-500/20"
            >
              ثبت نام به عنوان مدرس
            </motion.button>
            <Link to="/volunteer" className="w-full sm:w-auto">
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full px-10 py-4 bg-transparent border border-sky-400/50 text-sky-300 hover:bg-sky-800/50 hover:text-white hover:border-sky-300 rounded-2xl text-lg font-bold transition-all"
              >
                اطلاعات بیشتر
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>

      <Testimonials />

      {/* Volunteer Modal accessible from Homepage */}
      <VolunteerModal 
        isOpen={isVolunteerModalOpen} 
        onClose={() => setIsVolunteerModalOpen(false)} 
      />
    </>
  );
}
