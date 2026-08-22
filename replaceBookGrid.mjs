import fs from 'fs';
const file = 'src/components/BooksHub.tsx';
let content = fs.readFileSync(file, 'utf8');

const target = `          {/* Book Grid */}
          <motion.div layout className="min-h-[400px]">
            <AnimatePresence mode="popLayout">
              {filteredBooks.length > 0 ? (
                <motion.div layout className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
                  {filteredBooks.map((book) => (
                    <motion.div 
                      layout
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.2 }}
                      key={book.id} 
                      className="bg-slate-50 rounded-2xl p-4 border border-slate-100 flex flex-col group hover:shadow-md transition-shadow"
                    >
                      <div className="aspect-[3/4] bg-sky-100/50 rounded-xl mb-4 flex items-center justify-center text-sky-800 relative group-hover:bg-sky-100 transition-colors">
                        <FileText className="w-10 h-10 opacity-50" />
                        <div className="absolute top-2 right-2 bg-white/80 backdrop-blur-sm px-2 py-1 rounded text-xs font-bold text-slate-700 shadow-sm">
                          {book.grade}
                        </div>
                      </div>
                      <div className="flex-1 flex flex-col text-center">
                        <h3 className="font-bold text-slate-900 text-sm mb-1">{book.title}</h3>
                        <p className="text-xs font-medium text-sky-600 mb-3">Book 1</p>
                        <motion.button 
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="mt-auto w-full py-2 flex items-center justify-center gap-2 rounded-lg bg-white border border-sky-200 text-sky-700 text-xs font-bold hover:bg-sky-50 transition-colors"
                        >
                          <Download className="w-3 h-3" />
                          <span>{t('download')}</span>
                        </motion.button>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              ) : (`;

const replacement = `          {/* Book Grid */}
          <motion.div layout className="min-h-[400px]">
            <AnimatePresence mode="popLayout">
              {filteredBooks.length > 0 ? (
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
                  className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4"
                >
                  {filteredBooks.map((book) => (
                    <motion.div 
                      layout
                      variants={{
                        hidden: { opacity: 0, y: 20, scale: 0.95 },
                        show: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 300, damping: 24 } }
                      }}
                      whileHover={{ y: -5, scale: 1.02, boxShadow: "0px 10px 20px rgba(56, 189, 248, 0.15)" }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      key={book.id} 
                      className="bg-slate-50 rounded-2xl p-4 border border-slate-100 flex flex-col group transition-all duration-300 relative overflow-hidden"
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity z-10 pointer-events-none"></div>
                      <div className="aspect-[3/4] bg-gradient-to-br from-sky-100 to-indigo-50 rounded-xl mb-4 flex items-center justify-center text-sky-800 relative group-hover:shadow-inner transition-all overflow-hidden z-0">
                        <FileText className="w-10 h-10 opacity-40 group-hover:scale-110 group-hover:opacity-60 transition-transform duration-500" />
                        <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm px-2 py-1 rounded text-xs font-bold text-slate-700 shadow-sm z-20">
                          {book.grade}
                        </div>
                      </div>
                      <div className="flex-1 flex flex-col text-center relative z-20">
                        <h3 className="font-bold text-slate-900 text-sm mb-1 group-hover:text-sky-700 transition-colors">{book.title}</h3>
                        <p className="text-xs font-medium text-sky-600 mb-3">{book.subject}</p>
                        <motion.button 
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="mt-auto w-full py-2 flex items-center justify-center gap-2 rounded-lg bg-white border border-sky-200 text-sky-700 text-xs font-bold hover:bg-sky-500 hover:text-white hover:border-transparent transition-all shadow-sm"
                        >
                          <Download className="w-3 h-3" />
                          <span>{t('download')}</span>
                        </motion.button>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              ) : (`;

if (content.includes(target)) {
  fs.writeFileSync(file, content.replace(target, replacement));
  console.log('updated BookGrid');
} else {
  console.log('Target not found, trying regex');
  const regex = /\{\/\* Book Grid \*\/\}[\s\S]*?\) : \(/;
  if (regex.test(content)) {
    fs.writeFileSync(file, content.replace(regex, replacement));
    console.log('updated BookGrid with regex');
  } else {
    console.log('Target completely missing');
  }
}
