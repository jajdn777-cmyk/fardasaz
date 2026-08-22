import React, { useState, useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Scholarship } from '../types';
import { ShieldCheck, Globe, X, GraduationCap, MapPin, CheckCircle2, User } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { supabase } from '../lib/supabase';import { mockScholarships } from '../data';

export default function Scholarships() {
  const { t } = useTranslation();
  const [selectedGenders, setSelectedGenders] = useState<string[]>([]);
  const [selectedLevels, setSelectedLevels] = useState<string[]>([]);
  const [selectedFormats, setSelectedFormats] = useState<string[]>([]);
  const [selectedCoverages, setSelectedCoverages] = useState<string[]>([]);
  const [selectedCountries, setSelectedCountries] = useState<string[]>([]);
  const [selectedScholarship, setSelectedScholarship] = useState<Scholarship | null>(null);
  const [scholarships, setScholarships] = useState<Scholarship[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    async function fetchScholarships() {
      try {
        const { data, error } = await supabase.from('scholarships').select('*');
        if (!isMounted) return;
        if (error || !data || data.length === 0) {
          console.warn("Falling back to mock scholarships data.");
          setScholarships(mockScholarships);
        } else {
          setScholarships(data as Scholarship[]);
        }
      } catch (error) {
        if (!isMounted) return;
        console.error("Error fetching scholarships: ", error);
      } finally {
        if (isMounted) setLoading(false);
      }
    }
    fetchScholarships();
    return () => { isMounted = false; };
  }, []);

  const toggleFilter = (setState: React.Dispatch<React.SetStateAction<string[]>>, val: string) => {
    setState((prev) => (prev.includes(val) ? prev.filter((v) => v !== val) : [...prev, val]));
  };

  const filtered = useMemo(() => scholarships.filter((s) => {
    const matchGender = selectedGenders.length === 0 || selectedGenders.includes(s.gender);
    const matchLevel = selectedLevels.length === 0 || s.levels.some((l) => selectedLevels.includes(l));
    const matchFormat = selectedFormats.length === 0 || selectedFormats.includes(s.format);
    const matchCoverage = selectedCoverages.length === 0 || selectedCoverages.includes(s.coverage);
    const matchCountry = selectedCountries.length === 0 || (s.country && selectedCountries.includes(s.country));
    return matchGender && matchLevel && matchFormat && matchCoverage && matchCountry;
  }), [scholarships, selectedGenders, selectedLevels, selectedFormats, selectedCoverages, selectedCountries]);

  const availableCountries = useMemo(() => Array.from(new Set(scholarships.map(s => s.country).filter(Boolean))) as string[], [scholarships]);

  return (
    <section id="scholarships" className="py-16 md:py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-[32px] p-6 md:p-12 border border-slate-200 shadow-sm"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">{t('scholarships_title')}</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              فهرست بورسیه‌های معتبر جهانی که از نظر صحت و سقم بررسی شده‌اند تا شما را از کلاه‌برداری‌های تحصیلی محافظت کنند.
            </p>
          </div>

          {/* Filters Area */}
          <div className="mb-10 p-6 bg-slate-50 rounded-2xl border border-slate-100 flex flex-col gap-6">
            <div className="flex items-center justify-between gap-2 mb-2">
              <span className="font-bold text-slate-800">{t('filters')}</span>
              <span className="text-sm text-sky-600 font-bold bg-sky-100 px-3 py-1 rounded-full">{filtered.length} بورسیه یافت شد</span>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Gender */}
              <div>
                <h4 className="text-sm font-bold text-slate-700 mb-3 flex items-center gap-1.5">
                  <User className="w-4 h-4" /> جنسیت
                </h4>
                <div className="flex flex-wrap gap-2">
                  {[t('all'), t('female'), t('male')].map((val) => (
                    <button
                      key={val}
                      onClick={() => toggleFilter(setSelectedGenders, val)}
                      className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                        selectedGenders.includes(val)
                          ? 'bg-sky-500 text-white shadow-sm'
                          : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-100'
                      }`}
                    >
                      {val}
                    </button>
                  ))}
                </div>
              </div>

              {/* Level */}
              <div>
                <h4 className="text-sm font-bold text-slate-700 mb-3 flex items-center gap-1.5">
                  <GraduationCap className="w-4 h-4" /> مقطع تحصیلی
                </h4>
                <div className="flex flex-wrap gap-2">
                  {[t('school'), t('bachelors'), t('masters'), t('phd')].map((val) => (
                    <button
                      key={val}
                      onClick={() => toggleFilter(setSelectedLevels, val)}
                      className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                        selectedLevels.includes(val)
                          ? 'bg-sky-500 text-white shadow-sm'
                          : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-100'
                      }`}
                    >
                      {val}
                    </button>
                  ))}
                </div>
              </div>

              {/* Format */}
              <div>
                <h4 className="text-sm font-bold text-slate-700 mb-3 flex items-center gap-1.5">
                  <MapPin className="w-4 h-4" /> شیوه برگزاری
                </h4>
                <div className="flex flex-wrap gap-2">
                  {[t('in_person'), t('online')].map((val) => (
                    <button
                      key={val}
                      onClick={() => toggleFilter(setSelectedFormats, val)}
                      className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                        selectedFormats.includes(val)
                          ? 'bg-sky-500 text-white shadow-sm'
                          : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-100'
                      }`}
                    >
                      {val}
                    </button>
                  ))}
                </div>
              </div>

              {/* Coverage */}
              <div>
                <h4 className="text-sm font-bold text-slate-700 mb-3 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4" /> پوشش مالی
                </h4>
                <div className="flex flex-wrap gap-2">
                  {[t('fully_funded'), t('partial_funded')].map((val) => (
                    <button
                      key={val}
                      onClick={() => toggleFilter(setSelectedCoverages, val)}
                      className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                        selectedCoverages.includes(val)
                          ? 'bg-sky-500 text-white shadow-sm'
                          : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-100'
                      }`}
                    >
                      {val}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Country */}
            {availableCountries.length > 0 && (
              <div className="pt-4 border-t border-slate-200">
                <h4 className="text-sm font-bold text-slate-700 mb-3 flex items-center gap-1.5">
                  <Globe className="w-4 h-4" /> کشور مقصد
                </h4>
                <div className="flex flex-wrap gap-2">
                  {availableCountries.map((val) => (
                    <button
                      key={val}
                      onClick={() => toggleFilter(setSelectedCountries, val)}
                      className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                        selectedCountries.includes(val)
                          ? 'bg-sky-500 text-white shadow-sm'
                          : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-100'
                      }`}
                    >
                      {val}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Scholarship Cards */}
          <motion.div layout className="min-h-[400px]">
            <AnimatePresence mode="popLayout">
              {filtered.length > 0 ? (
                <motion.div 
                  layout 
                  variants={{
                    hidden: { opacity: 0 },
                    show: {
                      opacity: 1,
                      transition: { staggerChildren: 0.1 }
                    }
                  }}
                  initial="hidden"
                  animate="show"
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                  {filtered.map((scholarship) => (
                    <motion.div 
                      layout
                      variants={{
                        hidden: { opacity: 0, y: 20, scale: 0.95 },
                        show: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 300, damping: 24 } }
                      }}
                      whileHover={{ y: -5, scale: 1.02, boxShadow: "0px 10px 30px rgba(56, 189, 248, 0.15)" }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      key={scholarship.id} 
                      className="bg-slate-50 border border-slate-100 rounded-2xl p-6 hover:shadow-md transition-all flex flex-col relative overflow-hidden group"
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity z-0 pointer-events-none"></div>
                      <div className="flex justify-between items-start mb-4">
                        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-sky-100/50 text-sky-800 text-xs font-bold border border-sky-100">
                          <ShieldCheck className="w-3.5 h-3.5" />
                          <span>تأیید شده / معتبر</span>
                        </div>
                      </div>
                      
                      <h3 className="text-lg font-bold text-slate-900 mb-3 leading-tight min-h-[56px]">{scholarship.name}</h3>
                      
                      <div className="space-y-2 mb-6 text-xs text-slate-600 flex-1">
                        {scholarship.country && (
                          <div className="flex items-center gap-2">
                            <MapPin className="w-4 h-4 text-sky-600 shrink-0" />
                            <span>کشور: <strong className="text-slate-800">{scholarship.country}</strong></span>
                          </div>
                        )}
                        <div className="flex items-center gap-2">
                          <GraduationCap className="w-4 h-4 text-sky-600 shrink-0" />
                          <span>مقطع: <strong className="text-slate-800">{scholarship.levels.join('، ')}</strong></span>
                        </div>
                        <div className="flex items-center gap-2">
                          <User className="w-4 h-4 text-sky-600 shrink-0" />
                          <span>جنسیت: <strong className="text-slate-800">{scholarship.gender}</strong></span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Globe className="w-4 h-4 text-sky-600 shrink-0" />
                          <span>مخاطبین: <strong className="text-slate-800">{scholarship.targetAudience}</strong></span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-sky-600 shrink-0" />
                          <span>شیوه: <strong className="text-slate-800">{scholarship.format}</strong></span>
                        </div>
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-sky-600 shrink-0" />
                          <span>پوشش مالی: <strong className="text-slate-800">{scholarship.coverage}</strong></span>
                        </div>
                      </div>

                      <motion.button 
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setSelectedScholarship(scholarship)}
                        className="w-full px-6 py-2.5 bg-sky-600 text-white rounded-xl font-bold hover:bg-sky-700 transition-colors shadow-sm"
                      >
                        جزئیات و ثبت‌نام
                      </motion.button>
                    </motion.div>
                  ))}
                </motion.div>
              ) : (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="col-span-full py-12 text-center text-slate-500 bg-slate-50 rounded-2xl border border-slate-200 border-dashed"
                >
                  <p>هیچ بورسیه‌ای با این مشخصات یافت نشد.</p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      </div>

      {/* Detail Modal */}
      <AnimatePresence>
        {selectedScholarship && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm"
          >
            <motion.div 
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="bg-white rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
            >
              <div className="sticky top-0 bg-white border-b border-slate-100 p-4 flex justify-between items-center z-10">
                <h3 className="font-bold text-xl text-slate-900">{t('scholarship_details')}</h3>
                <button 
                  onClick={() => setSelectedScholarship(null)}
                  className="p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              <div className="p-6">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-50 text-sky-700 text-xs font-bold border border-sky-100 mb-4">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>این بورسیه توسط تیم راه دانش بررسی و تأیید شده است. هیچ‌گونه هزینه‌ای برای ثبت‌نام اولیه نیاز نیست.</span>
                </div>
                
                <h2 className="text-2xl font-bold text-slate-900 mb-4">{selectedScholarship.name}</h2>
                
                <div className="flex flex-wrap gap-2 mb-6">
                  {selectedScholarship.country && (
                    <span className="px-2.5 py-1 bg-slate-100 text-slate-700 rounded-md text-xs font-medium">کشور: {selectedScholarship.country}</span>
                  )}
                  <span className="px-2.5 py-1 bg-slate-100 text-slate-700 rounded-md text-xs font-medium">مقطع: {selectedScholarship.levels.join('، ')}</span>
                  <span className="px-2.5 py-1 bg-slate-100 text-slate-700 rounded-md text-xs font-medium">جنسیت: {selectedScholarship.gender}</span>
                  <span className="px-2.5 py-1 bg-slate-100 text-slate-700 rounded-md text-xs font-medium">پوشش مالی: {selectedScholarship.coverage}</span>
                  <span className="px-2.5 py-1 bg-slate-100 text-slate-700 rounded-md text-xs font-medium">شیوه: {selectedScholarship.format}</span>
                </div>

                <div className="prose prose-slate max-w-none text-slate-600 mb-8">
                  <p>{selectedScholarship.description}</p>
                  <h4 className="text-slate-900 font-bold mt-6 mb-2">شرایط عمومی (نمونه):</h4>
                  <ul className="list-disc list-inside space-y-1">
                    <li>{t('req1')}</li>
                    <li>ارائه مدارک تحصیلی (شهادتنامه یا نمرات سه سال اخیر)</li>
                    <li>{t('req2')}</li>
                    <li>دانستن زبان انگلیسی (بستگی به بورسیه دارد)</li>
                  </ul>
                </div>

                <div className="bg-sky-50 border border-sky-200 rounded-xl p-4 mb-6 flex gap-3">
                  <ShieldCheck className="w-6 h-6 text-sky-600 shrink-0" />
                  <div>
                    <h4 className="font-bold text-sky-800 mb-1 text-sm">{t('safety_warning')}</h4>
                    <p className="text-sky-700 text-xs leading-relaxed">هیچ نهاد معتبری برای بررسی فرم ثبت‌نام از شما پول درخواست نمی‌کند. در صورت مشاهده هرگونه درخواست وجه، از ادامه مراحل خودداری کنید.</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <motion.a 
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    href={selectedScholarship.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-3 bg-sky-600 text-white rounded-xl font-bold hover:bg-sky-700 transition-colors w-full text-center flex items-center justify-center gap-2"
                  >
                    <Globe className="w-5 h-5" /> ورود به سایت رسمی ثبت‌نام
                  </motion.a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
