import React, { useMemo, memo } from 'react';
import { BookOpen, Shield, Users, MonitorPlay, GraduationCap } from 'lucide-react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Mission = memo(function Mission() {
  const { t } = useTranslation();

  const services = useMemo(() => [
    {
      icon: <MonitorPlay className="w-6 h-6 text-sky-600" />,
      title: t('srv_classes_title'),
      description: t('srv_classes_desc'),
      link: '/classes'
    },
    {
      icon: <BookOpen className="w-6 h-6 text-sky-600" />,
      title: t('srv_library_title'),
      description: t('srv_library_desc'),
      link: '/library'
    },
    {
      icon: <GraduationCap className="w-6 h-6 text-sky-600" />,
      title: t('srv_kankor_title'),
      description: t('srv_kankor_desc'),
      link: '/kankor'
    },
    {
      icon: <Users className="w-6 h-6 text-sky-600" />,
      title: t('srv_other_title'),
      description: t('srv_other_desc'),
      link: '/classes'
    }
  ], [t]);

  return (
    <section id="about" className="py-24 bg-slate-50 overflow-hidden relative">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-96 bg-sky-200/20 blur-[100px] rounded-full pointer-events-none z-0"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-sky-100/50 rounded-full blur-3xl -translate-y-1/4 translate-x-1/4 -z-10"></div>
            <h2 className="text-sm font-bold text-sky-600 mb-3 tracking-wider uppercase">{t('mission_about_us')}</h2>
            <h3 className="text-4xl font-extrabold text-slate-900 mb-8 leading-tight">{t('mission_welcome')}</h3>
            <div className="space-y-6 text-slate-600 leading-relaxed text-lg text-justify font-medium">
              <p>{t('mission_desc1')}</p>
              <p>{t('mission_desc2')}</p>
              <ul className="list-none space-y-3 pr-2 text-slate-700 mt-6">
                {[
                  t('mission_li1'),
                  t('mission_li2'),
                  t('mission_li3'),
                  t('mission_li4'),
                  t('mission_li5')
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-sky-500"></div>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-12">
              <Link to="/register" className="text-white font-bold hover:bg-sky-700 inline-flex items-center gap-3 group bg-sky-600 px-8 py-4 rounded-2xl transition-all shadow-lg shadow-sky-200">
                {t('mission_make_change')} <span aria-hidden="true" className="group-hover:-translate-x-2 transition-transform text-xl">&larr;</span>
              </Link>
            </div>
          </motion.div>
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={{
              visible: { transition: { staggerChildren: 0.15 } }
            }}
          >
            <h2 className="text-2xl font-bold text-slate-900 mb-8 text-center lg:text-right">{t('mission_services_title')}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {services.map((service, idx) => (
                <Link to={service.link} key={idx}>
                  <motion.div 
                    variants={{
                      hidden: { opacity: 0, y: 20 },
                      visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
                    }}
                    className="p-8 rounded-[2rem] bg-white border border-slate-100 flex flex-col gap-5 shadow-sm transition-all duration-300 hover:border-sky-300 group h-full relative overflow-hidden backdrop-blur-sm"
                    whileHover={{ y: -8, scale: 1.02, boxShadow: "0 20px 40px -10px rgba(56, 189, 248, 0.2)" }}
                  >
                    <div className="absolute top-0 right-0 w-32 h-32 bg-sky-50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-sky-100 transition-colors"></div>
                    <div className="w-14 h-14 bg-gradient-to-br from-sky-50 to-blue-50 rounded-2xl shadow-sm border border-sky-100 flex items-center justify-center relative z-10 group-hover:scale-110 transition-transform duration-300">
                      {service.icon}
                    </div>
                    <div className="relative z-10">
                      <h4 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-sky-700 transition-colors">{service.title}</h4>
                      <p className="text-slate-500 text-sm leading-relaxed">{service.description}</p>
                    </div>
                  </motion.div>
                </Link>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
});
export default Mission;