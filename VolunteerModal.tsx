import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Send, CheckCircle2, Loader2 } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface VolunteerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function VolunteerModal({ isOpen, onClose }: VolunteerModalProps) {
  const [formData, setFormData] = useState({
    full_name: '',
    contact_info: '',
    subject_expertise: '',
    motivation: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const subjects = [
    { value: 'ریاضیات', label: 'Math - ریاضیات' },
    { value: 'فزیک', label: 'Physics - فزیک' },
    { value: 'کیمیا', label: 'Chemistry - کیمیا' },
    { value: 'انگلیسی', label: 'English - انگلیسی' },
    { value: 'کمپیوتر ساینس', label: 'Computer Science - کمپیوتر ساینس' }
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      // If supabase is missing configuration (mock mode), it might not have an insert method,
      // but assuming the user configures it correctly.
      if (!supabase.from('volunteers').insert) {
        throw new Error("Supabase is not configured. Please add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.");
      }

      const { error: submitError } = await supabase
        .from('volunteers')
        .insert([formData]);

      if (submitError) {
        throw submitError;
      }

      setIsSuccess(true);
      setFormData({
        full_name: '',
        contact_info: '',
        subject_expertise: '',
        motivation: ''
      });
      
      // Auto-close after 3 seconds on success
      setTimeout(() => {
        onClose();
        setTimeout(() => setIsSuccess(false), 500); // Wait for exit animation
      }, 3000);
      
    } catch (err: any) {
      console.error("Error submitting volunteer form:", err);
      setError(err.message || 'خطا در ارسال اطلاعات. لطفا دوباره تلاش کنید.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm"
          dir="rtl"
        >
          <motion.div 
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            className="bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden"
          >
            <div className="flex justify-between items-center p-5 border-b border-slate-100 bg-slate-50">
              <h3 className="font-bold text-lg text-slate-800">ثبت‌نام به عنوان مدرس داوطلب</h3>
              <button onClick={onClose} className="text-slate-400 hover:text-slate-600 transition-colors p-1 rounded-md hover:bg-slate-200">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-6">
              {isSuccess ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center py-8 text-center"
                >
                  <div className="w-16 h-16 bg-green-100 text-green-500 rounded-full flex items-center justify-center mb-4">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <h4 className="text-xl font-bold text-slate-800 mb-2">ثبت با موفقیت انجام شد</h4>
                  <p className="text-slate-600">تشکر! اطلاعات شما با موفقیت ثبت شد. تیم راه دانش به زودی با شما تماس خواهد گرفت.</p>
                </motion.div>
              ) : (
                <form className="space-y-4" onSubmit={handleSubmit}>
                  {error && (
                    <div className="p-3 bg-red-50 text-red-600 text-sm rounded-lg border border-red-100">
                      {error}
                    </div>
                  )}
                  
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">نام کامل</label>
                    <input 
                      type="text" 
                      name="full_name"
                      value={formData.full_name}
                      onChange={handleChange}
                      placeholder="نام و تخلص خود را وارد کنید"
                      className="w-full p-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#5D9CEC] focus:border-[#5D9CEC] focus:outline-none transition-all text-slate-800 bg-slate-50 text-right" 
                      required 
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">ایمیل یا آیدی تلگرام</label>
                    <input 
                      type="text" 
                      name="contact_info"
                      value={formData.contact_info}
                      onChange={handleChange}
                      placeholder="example@email.com یا @username"
                      className="w-full p-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#5D9CEC] focus:border-[#5D9CEC] focus:outline-none transition-all text-slate-800 bg-slate-50 text-left" 
                      required 
                      dir="ltr"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">مضمون تدریس</label>
                    <select 
                      name="subject_expertise"
                      value={formData.subject_expertise}
                      onChange={handleChange}
                      className="w-full p-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#5D9CEC] focus:border-[#5D9CEC] focus:outline-none transition-all text-slate-800 bg-slate-50 text-right" 
                      required
                    >
                      <option value="">انتخاب کنید...</option>
                      {subjects.map((sub, idx) => (
                        <option key={idx} value={sub.value}>{sub.label}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">چرا میخواهید به حیث استاد داوطلب همکاری کنید؟</label>
                    <textarea 
                      name="motivation"
                      value={formData.motivation}
                      onChange={handleChange}
                      rows={3}
                      placeholder="انگیزه خود را بنویسید..."
                      className="w-full p-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#5D9CEC] focus:border-[#5D9CEC] focus:outline-none transition-all text-slate-800 bg-slate-50 resize-none text-right" 
                      required 
                    ></textarea>
                  </div>
                  
                  <motion.button 
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit" 
                    disabled={isSubmitting}
                    className="w-full py-3 mt-4 bg-[#5D9CEC] text-white rounded-xl font-bold hover:bg-blue-500 transition-colors flex items-center justify-center gap-2 shadow-sm disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        <span>در حال ارسال...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        <span>ثبت درخواست</span>
                      </>
                    )}
                  </motion.button>
                </form>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
