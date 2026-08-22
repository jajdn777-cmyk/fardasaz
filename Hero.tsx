import React, { useState, useEffect, useMemo } from 'react';
import { Search, GraduationCap, PlayCircle, Download } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { t } = useTranslation();

  const slides = useMemo(() => [
    {
      id: 1,
      image: 'https://upload.wikimedia.org/wikipedia/commons/d/d4/Afghan_school_girls_in_2002.jpg',
      title: t('hero_slide1_title'),
      highlight: t('hero_slide1_highlight'),
      subtitle: t('hero_slide1_subtitle'),
      primaryButton: { text: t('hero_slide1_btn1'), icon: <Search className="w-5 h-5" />, link: '/library' },
      secondaryButton: { text: t('hero_slide1_btn2'), icon: <PlayCircle className="w-5 h-5" />, link: '/volunteer' }
    },
    {
      id: 2,
      image: 'https://upload.wikimedia.org/wikipedia/commons/0/0f/Afghan_school_girls_in_Herat.jpg',
      title: t('hero_slide2_title'),
      highlight: t('hero_slide2_highlight'),
      subtitle: t('hero_slide2_subtitle'),
      primaryButton: { text: t('hero_slide2_btn1'), icon: <GraduationCap className="w-5 h-5" />, link: '/kankor' },
      secondaryButton: { text: t('hero_slide2_btn2'), icon: <Download className="w-5 h-5" />, link: '/scholarships' }
    },
    {
      id: 3,
      image: 'https://upload.wikimedia.org/wikipedia/commons/4/49/Afghan_girls_and_students_of_the_newly_opened_Shar-e_Sara_Girls_School_wait_for_an_eye_examination_from_a_coalition_forces%27_ophthalmologist_in_Zabul_province%2C_Afghanistan%2C_Sept_110913-N-AT856-035.jpg',
      title: t('hero_slide3_title'),
      highlight: t('hero_slide3_highlight'),
      subtitle: t('hero_slide3_subtitle'),
      primaryButton: { text: t('hero_slide3_btn1'), icon: <GraduationCap className="w-5 h-5" />, link: '/register' },
      secondaryButton: { text: t('hero_slide3_btn2'), icon: <Search className="w-5 h-5" />, link: '/#about' }
    }
  ], [t]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000); // 6 seconds per slide
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full h-[100vh] min-h-[600px] overflow-hidden bg-sky-900 mt-0">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="absolute inset-0"
        >
          <img 
            src={slides[currentSlide].image} 
            alt="Afghan students studying" 
            className="absolute inset-0 w-full h-full object-cover"
          />
          {/* Gradient Overlay for text readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-sky-900/90 via-sky-900/60 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-transparent to-transparent"></div>
        </motion.div>
      </AnimatePresence>

      {/* Abstract floating shapes for vibrance */}
      <motion.div
        animate={{ y: [0, -30, 0], rotate: [0, 10, 0], scale: [1, 1.05, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/4 right-1/4 w-96 h-96 bg-sky-500/30 rounded-full blur-[100px] pointer-events-none z-0"
      />
      <motion.div
        animate={{ y: [0, 40, 0], x: [0, -20, 0], scale: [1, 1.1, 1] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute bottom-1/4 left-1/4 w-[30rem] h-[30rem] bg-indigo-500/20 rounded-full blur-[120px] pointer-events-none z-0"
      />

      <div className="relative z-10 h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center pb-20 pt-20">
        <div className="max-w-3xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
            >
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight md:leading-tight mb-6 text-white drop-shadow-2xl">
                {slides[currentSlide].title} <br />
                <motion.span 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6, duration: 0.8, type: "spring", bounce: 0.4 }}
                  className="text-sky-300 inline-block drop-shadow-2xl mt-2"
                >
                  {slides[currentSlide].highlight}
                </motion.span>
              </h1>
              
              <p className="text-sky-50 text-lg md:text-xl leading-relaxed mb-10 opacity-90 max-w-2xl drop-shadow-md font-medium">
                {slides[currentSlide].subtitle}
              </p>

              <div className="flex flex-col sm:flex-row gap-5">
                <Link to={slides[currentSlide].primaryButton.link}>
                  <motion.button
                    whileHover={{ scale: 1.05, boxShadow: "0px 10px 30px rgba(56, 189, 248, 0.4)" }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full sm:w-auto px-8 py-4 bg-sky-500 hover:bg-sky-400 text-white rounded-2xl text-lg font-bold transition-all flex items-center justify-center gap-3 shadow-lg shadow-sky-500/30"
                  >
                    {slides[currentSlide].primaryButton.icon}
                    <span>{slides[currentSlide].primaryButton.text}</span>
                  </motion.button>
                </Link>
                <Link to={slides[currentSlide].secondaryButton.link}>
                  <motion.button
                    whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.15)", borderColor: "rgba(255,255,255,0.5)" }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full sm:w-auto px-8 py-4 bg-white/5 backdrop-blur-md border border-white/20 text-white rounded-2xl text-lg font-bold transition-all flex items-center justify-center gap-3 hover:border-white/50 shadow-lg"
                  >
                    {slides[currentSlide].secondaryButton.icon}
                    <span>{slides[currentSlide].secondaryButton.text}</span>
                  </motion.button>
                </Link>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-12 left-0 right-0 z-20 flex justify-center gap-4">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`h-2 rounded-full transition-all duration-500 ease-out ${
              currentSlide === index ? 'w-12 bg-sky-400 shadow-[0_0_10px_rgba(56,189,248,0.8)]' : 'w-2 bg-white/40 hover:bg-white/60'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
