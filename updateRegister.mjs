import fs from 'fs';
const file = 'src/pages/RegisterPage.tsx';
let content = fs.readFileSync(file, 'utf8');

const target = `<section className="py-24 bg-white min-h-[calc(100vh-80px)] flex flex-col justify-center">`;
const replacement = `<section className="py-24 bg-slate-50 min-h-[calc(100vh-80px)] flex flex-col justify-center relative overflow-hidden">
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
      />`;

const innerTarget = `className="bg-slate-50 border border-slate-200 rounded-[32px] p-8 md:p-12 shadow-sm"`;
const innerReplacement = `className="bg-white/80 backdrop-blur-xl border border-slate-100 rounded-[32px] p-8 md:p-12 shadow-2xl shadow-sky-900/5 relative z-10"`;

if (content.includes(target) && content.includes(innerTarget)) {
  content = content.replace(target, replacement);
  content = content.replace(innerTarget, innerReplacement);
  fs.writeFileSync(file, content);
  console.log('updated Register');
} else {
  console.log('Target not found for Register');
}
