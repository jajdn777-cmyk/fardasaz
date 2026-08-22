import React, { useState, useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { BookOpen, Search, Download, FileText, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { supabase } from '../lib/supabase';
import { mockBooks } from '../data';

interface Book {
  id: string;
  title: string;
  subject: string;
  grade: string;
  pdfUrl?: string;
}

export default function BooksHub() {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState(t('all'));
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);

  const tabs = [t('all'), t('grade_12'), t('grade_11'), t('grade_10'), t('grade_9')];

  useEffect(() => {
    let isMounted = true;
    async function fetchBooks() {
      try {
        const { data, error } = await supabase.from('books').select('*');
        if (!isMounted) return;
        if (error || !data || data.length === 0) {
          console.warn("Falling back to mock books data.");
          setBooks(mockBooks);
        } else {
          setBooks(data as Book[]);
        }
      } catch (error) {
        if (!isMounted) return;
        console.error("Error fetching books: ", error);
        setBooks(mockBooks);
      } finally {
        if (isMounted) setLoading(false);
      }
    }
    fetchBooks();
    return () => { isMounted = false; };
  }, []);

  const filteredBooks = useMemo(() => {
    return books.filter((book) => {
      const matchesSearch = book.title.includes(searchQuery) || book.subject.includes(searchQuery) || book.grade.includes(searchQuery);
      const matchesTab = activeTab === t('all') || book.grade === activeTab;
      return matchesSearch && matchesTab;
    });
  }, [searchQuery, activeTab, books]);

  return (
    <section id="books" className="py-24 bg-slate-50 min-h-screen relative overflow-hidden">
      {/* Decorative background elements */}
      <motion.div
        animate={{ y: [0, -30, 0], scale: [1, 1.1, 1] }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-10 right-0 w-[40rem] h-[40rem] bg-sky-200/40 rounded-full blur-[150px] pointer-events-none z-0"
      />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            className="w-24 h-24 bg-white border border-sky-100 rounded-3xl flex items-center justify-center text-sky-600 mx-auto mb-8 shadow-xl shadow-sky-100/50"
          >
            <BookOpen className="w-12 h-12" />
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6 tracking-tight"
          >
            {t('books_title')}
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed"
          >
            در اینجا میتوانید تمامی کتابهای درسی مکتب افغانستان را به صورت رایگان دانلود کنید.
          </motion.p>
        </div>

        {/* Search & Filters */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white/80 backdrop-blur-md p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row gap-4 items-center justify-between mb-12"
        >
          <div className="w-full md:w-96 relative">
            <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
            <input
              type="text"
              placeholder="جستجوی کتاب (مثلاً: ریاضی، فزیک)..."
              className="w-full pl-4 pr-12 py-3.5 rounded-xl border-none bg-slate-100 focus:outline-none focus:ring-2 focus:ring-sky-500 transition-all text-right shadow-inner text-slate-700 font-medium"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              dir="rtl"
            />
          </div>
          
          <div className="flex bg-slate-100 rounded-xl p-1.5 w-full md:w-auto overflow-x-auto hide-scrollbar shadow-inner border border-slate-200/50">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-2.5 rounded-lg text-sm transition-all whitespace-nowrap relative ${
                  activeTab === tab
                    ? 'text-sky-700 font-bold'
                    : 'text-slate-600 hover:text-sky-600 font-medium'
                }`}
              >
                {activeTab === tab && (
                  <motion.div 
                    layoutId="activeTabIndicatorBooks"
                    className="absolute inset-0 bg-white rounded-lg shadow-sm border border-slate-200/50"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <span className="relative z-10">{tab}</span>
              </button>
            ))}
          </div>
        </motion.div>

        {/* Book Grid */}
        <motion.div layout className="min-h-[400px]">
          {loading ? (
             <div className="flex justify-center py-20">
               <div className="w-12 h-12 border-4 border-sky-200 border-t-sky-600 rounded-full animate-spin"></div>
             </div>
          ) : (
            <AnimatePresence mode="popLayout">
              {filteredBooks.length > 0 ? (
                <motion.div 
                  layout 
                  variants={{
                    hidden: { opacity: 0 },
                    show: {
                      opacity: 1,
                      transition: { staggerChildren: 0.05 }
                    }
                  }}
                  initial="hidden"
                  animate="show"
                  className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6"
                >
                  {filteredBooks.map((book) => (
                    <motion.div 
                      layout
                      variants={{
                        hidden: { opacity: 0, y: 30, scale: 0.9 },
                        show: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 300, damping: 24 } }
                      }}
                      whileHover={{ y: -8, scale: 1.03, boxShadow: "0px 20px 40px -10px rgba(56, 189, 248, 0.25)" }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      key={book.id} 
                      className="bg-white rounded-[1.5rem] p-5 border border-slate-100 flex flex-col group transition-all duration-300 relative overflow-hidden shadow-sm hover:border-sky-200"
                    >
                      <div className="absolute inset-0 bg-gradient-to-b from-sky-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0 pointer-events-none"></div>
                      
                      <div className="aspect-[3/4] bg-gradient-to-br from-slate-100 to-slate-50 rounded-xl mb-5 flex items-center justify-center text-slate-400 relative overflow-hidden z-10 border border-slate-200/50 group-hover:border-sky-200 transition-colors">
                        <FileText className="w-12 h-12 opacity-50 group-hover:scale-110 group-hover:opacity-100 group-hover:text-sky-500 transition-all duration-500" />
                        <div className="absolute top-3 right-3 bg-white/95 backdrop-blur px-2.5 py-1 rounded-md text-[10px] font-bold text-slate-700 shadow-sm border border-slate-100">
                          {book.grade}
                        </div>
                      </div>
                      
                      <div className="flex-1 flex flex-col text-center relative z-20">
                        <h3 className="font-bold text-slate-900 text-sm mb-1 group-hover:text-sky-700 transition-colors line-clamp-2 leading-tight">{book.title}</h3>
                        <p className="text-xs font-medium text-slate-500 mb-4">{book.subject}</p>
                        
                        <motion.button 
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="mt-auto w-full py-2.5 flex items-center justify-center gap-2 rounded-xl bg-slate-50 border border-slate-200 text-sky-700 text-sm font-bold hover:bg-sky-500 hover:text-white hover:border-transparent transition-all"
                        >
                          <Download className="w-4 h-4" />
                          <span>{t('download')}</span>
                        </motion.button>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              ) : (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-center py-24 bg-white rounded-3xl border border-slate-200 border-dashed max-w-2xl mx-auto shadow-sm"
                >
                  <FileText className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-slate-900 mb-2">کتابی یافت نشد</h3>
                  <p className="text-slate-500">لطفاً عبارات دیگری را جستجو کنید.</p>
                </motion.div>
              )}
            </AnimatePresence>
          )}
        </motion.div>
      </div>
    </section>
  );
}
