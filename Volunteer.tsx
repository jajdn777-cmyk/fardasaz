import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { VolunteerSession } from './types';
import { Users, MonitorPlay, Clock, Send, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { supabase } from './supabase';import { mockVolunteers } from './data';
import VolunteerModal from './VolunteerModal';

export default function Volunteer() {
  const { t } = useTranslation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [volunteers, setVolunteers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    async function fetchVolunteers() {
      try {
        const { data, error } = await supabase.from('volunteer_sessions').select('*');
        if (!isMounted) return;
        if (error || !data || data.length === 0) {
          console.warn("Falling back to mock volunteer data.");
          setVolunteers(mockVolunteers);
        } else {
          setVolunteers(data as any[]);
        }
      } catch (error) {
        if (!isMounted) return;
        console.error("Error fetching volunteers: ", error);
      } finally {
        if (isMounted) setLoading(false);
      }
    }
    fetchVolunteers();
    return () => { isMounted = false; };
  }, []);

  return (
    <section id="volunteer" className="py-24 bg-slate-50 border-t border-slate-200 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4 tracking-tight">برنامه‌های آموزشی و داوطلبان</h2>
          <p className="text-slate-600 max-w-2xl mx-auto text-lg leading-relaxed">
            با کمک اساتید رضاکار، ما صنوف آنلاین رایگان برای ارتقای ظرفیت علمی شما برگزار می‌کنیم.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={{
              visible: { transition: { staggerChildren: 0.15 } }
            }}
            className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6"
          >
            {loading ? (
              <div className="col-span-full flex justify-center items-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-sky-600"></div>
              </div>
            ) : volunteers.length > 0 ? (
              volunteers.map((session) => (
                <motion.div 
                  key={session.id} 
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
                  }}
                  className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 group"
                >
                  <div className="w-14 h-14 bg-gradient-to-br from-sky-50 to-blue-50 text-sky-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <MonitorPlay className="w-7 h-7" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-4">{session.subject}</h3>
                  <div className="space-y-3 mb-8">
                    <div className="flex items-center text-sm text-slate-600 gap-3">
                      <Users className="w-4 h-4 text-sky-500" />
                      <span className="font-medium">مدرس: <span className="text-slate-800">{session.tutor || session.instructorName}</span></span>
                    </div>
                    <div className="flex items-center text-sm text-slate-600 gap-3">
                      <Clock className="w-4 h-4 text-sky-500" />
                      <span className="font-medium">زمان: <span className="text-slate-800">{session.schedule || session.time}</span></span>
                    </div>
                    <div className="flex items-center text-sm text-slate-600 gap-3">
                      <Send className="w-4 h-4 text-sky-500" />
                      <span className="font-medium">پلتفرم: <span className="text-slate-800">{session.platform}</span></span>
                    </div>
                  </div>
                  <motion.button 
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full py-3 bg-slate-50 text-sky-700 rounded-xl font-bold hover:bg-sky-50 transition-colors border border-sky-100 group-hover:bg-sky-600 group-hover:text-white group-hover:border-transparent"
                  >
                    پیوستن به صنف
                  </motion.button>
                </motion.div>
              ))
            ) : (
              <motion.div 
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
                }}
                className="col-span-full bg-white p-10 rounded-3xl border border-slate-100 shadow-sm flex flex-col items-center justify-center text-center h-full min-h-[300px]"
              >
                <div className="w-20 h-20 bg-sky-50 text-sky-400 rounded-full flex items-center justify-center mb-6">
                  <Users className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4">در حال حاضر داوطلبی ثبت نشده است</h3>
                <p className="text-slate-600 max-w-md mx-auto mb-8 leading-relaxed text-lg">
                  شما می‌توانید اولین نفری باشید که به عنوان مدرس رضاکار در راه دانش ثبت‌نام می‌کنید و به آموزش جوانان افغانستان کمک می‌کنید.
                </p>
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsModalOpen(true)}
                  className="px-8 py-4 bg-sky-600 text-white rounded-2xl font-bold shadow-lg shadow-sky-200 hover:bg-sky-700 transition-colors"
                >
                  ثبت‌نام به عنوان مدرس
                </motion.button>
              </motion.div>
            )}
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-gradient-to-br from-sky-500 to-indigo-600 rounded-[32px] p-8 border border-sky-400 relative flex flex-col justify-center shadow-lg text-white overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
            <h3 className="text-3xl font-bold mb-4 relative z-10">آیا می‌خواهید تدریس کنید؟</h3>
            <p className="mb-10 leading-relaxed opacity-90 relative z-10 text-lg">
              اگر شما متخصص در یک حوزه هستید و می‌خواهید تجربیات خود را با دانش‌آموزان افغان به اشتراک بگذارید، به جمع داوطلبان ما بپیوندید.
            </p>
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsModalOpen(true)}
              className="w-full py-4 bg-white text-sky-700 rounded-2xl font-bold shadow-xl hover:bg-sky-50 transition-colors relative z-10"
            >
              ثبت‌نام به عنوان مدرس
            </motion.button>
            <div className="absolute bottom-6 left-8 text-sm opacity-80 font-medium relative z-10 mt-6 text-center">{t('active_volunteers')}</div>
          </motion.div>

        </div>
      </div>

      <VolunteerModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </section>
  );
}
