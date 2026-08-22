import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'motion/react';
import { User, Mail, BookOpen, Send, Loader2, CheckCircle2 } from 'lucide-react';
import { supabase } from '../lib/supabase';

export default function RegisterPage() {
  const { t } = useTranslation();
  
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    grade_level: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      if (!supabase.from('students').insert) {
        throw new Error("Supabase is not configured properly.");
      }

      const { error: submitError } = await supabase
        .from('students')
        .insert([formData]);

      if (submitError) throw submitError;

      setIsSuccess(true);
      setFormData({ full_name: '', email: '', grade_level: '' });
      
    } catch (err: any) {
      console.error("Error submitting registration form:", err);
      setError(err.message || 'خطا در ارسال اطلاعات. لطفا دوباره تلاش کنید.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-24 bg-slate-50 min-h-[calc(100vh-80px)] flex flex-col justify-center relative overflow-hidden">
      {/* Decorative background elements */}
      <motion.div
        animate={{ y: [0, -30, 0], scale: [1, 1.1, 1] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-0 right-0 w-96 h-96 bg-sky-200/40 rounded-full blur-[120px] pointer-events-none z-0"
      />
      <motion.div
        animate={{ y: [0, 30, 0], scale: [1, 1.05, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute bottom-0 left-0 w-80 h-80 bg-indigo-200/40 rounded-full blur-[100px] pointer-events-none z-0"
      />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white/80 backdrop-blur-xl border border-slate-100 rounded-[32px] p-8 md:p-12 shadow-2xl shadow-sky-900/5 relative z-10"
        >
          {isSuccess ? (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center justify-center py-12 text-center"
            >
              <div className="w-20 h-20 bg-green-100 text-green-500 rounded-full flex items-center justify-center mb-6">
                <CheckCircle2 className="w-12 h-12" />
              </div>
              <h4 className="text-2xl font-bold text-slate-800 mb-4">ثبت نام شما موفقانه انجام شد!</h4>
              <p className="text-slate-600 mb-8 max-w-md mx-auto">تشکر از پیوستن شما به راه دانش. اکنون می‌توانید از تمامی امکانات استفاده کنید.</p>
              <button 
                onClick={() => setIsSuccess(false)}
                className="px-8 py-3 bg-sky-600 text-white rounded-xl font-bold hover:bg-sky-700 transition-colors"
              >
                ثبت نام جدید
              </button>
            </motion.div>
          ) : (
            <>
              <div className="text-center mb-10">
                <h2 className="text-3xl font-bold text-slate-900 mb-4">{t('register_title')}</h2>
                <p className="text-slate-600">برای دسترسی به دروس آنلاین و ارزیابی کارخانگی‌ها ثبت نام کنید.</p>
              </div>

              <form className="space-y-6" onSubmit={handleSubmit}>
                {error && (
                  <div className="p-4 bg-red-50 text-red-600 text-sm rounded-xl border border-red-100">
                    {error}
                  </div>
                )}
                
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">{t('full_name')}</label>
                  <div className="relative">
                    <User className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                    <input 
                      type="text" 
                      name="full_name"
                      value={formData.full_name}
                      onChange={handleChange}
                      placeholder="مثال: احمد احمدی"
                      className="w-full pl-4 pr-10 py-3 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-sky-500 transition-all text-right"
                      dir="rtl"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                    <input 
                      type="email" 
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="example@email.com"
                      className="w-full pl-4 pr-10 py-3 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-sky-500 transition-all text-left"
                      dir="ltr"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">{t('grade_level')}</label>
                  <div className="relative">
                    <BookOpen className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                    <select 
                      name="grade_level"
                      value={formData.grade_level}
                      onChange={handleChange}
                      className="w-full pl-4 pr-10 py-3 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-sky-500 transition-all appearance-none text-right" 
                      dir="rtl"
                      required
                    >
                      <option value="">انتخاب کنید...</option>
                      <option value="12">{t('grade_12')}</option>
                      <option value="11">{t('grade_11')}</option>
                      <option value="10">{t('grade_10')}</option>
                      <option value="9">{t('grade_9')}</option>
                      <option value="kankor">آمادگی کانکور</option>
                    </select>
                  </div>
                </div>

                <motion.button 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={isSubmitting}
                  className="w-full py-4 bg-sky-600 hover:bg-sky-700 text-white rounded-xl text-lg font-bold shadow-lg shadow-sky-200 transition-all flex justify-center items-center gap-2 mt-8 disabled:opacity-70 disabled:cursor-not-allowed"
                  type="submit"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>در حال ارسال...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      <span>{t('register_create_account')}</span>
                    </>
                  )}
                </motion.button>
              </form>
            </>
          )}
        </motion.div>
      </div>
    </section>
  );
}
