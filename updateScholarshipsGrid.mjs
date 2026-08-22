import fs from 'fs';
const file = 'src/components/Scholarships.tsx';
let content = fs.readFileSync(file, 'utf8');

const regex = /<motion\.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">[\s\S]*?<motion\.div \n? *layout\n? *initial=\{\{ opacity: 0, scale: 0\.9 \}\}\n? *animate=\{\{ opacity: 1, scale: 1 \}\}\n? *exit=\{\{ opacity: 0, scale: 0\.9 \}\}\n? *transition=\{\{ duration: 0\.2 \}\}\n? *key=\{scholarship\.id\} \n? *className="bg-slate-50 border border-slate-100 rounded-2xl p-6 hover:shadow-md transition-shadow flex flex-col"\n? *>/;

const replacement = `<motion.div 
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
                      <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity z-0 pointer-events-none"></div>`;

if (regex.test(content)) {
  fs.writeFileSync(file, content.replace(regex, replacement));
  console.log('updated Scholarships');
} else {
  console.log('Target not found for Scholarships regex');
}
