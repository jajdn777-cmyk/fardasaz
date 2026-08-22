import fs from 'fs';
const file = 'src/components/Mission.tsx';
let content = fs.readFileSync(file, 'utf8');

const regex = /whileHover=\{\{ scale: 1\.03, y: -5 \}\}\n? *className="p-8 rounded-\[2rem\] bg-white border border-slate-100 flex flex-col gap-5 shadow-sm transition-all duration-300 hover:border-sky-300 group h-full relative overflow-hidden backdrop-blur-sm"\n? *whileHover=\{\{ y: -8, scale: 1\.02, boxShadow: "0 20px 40px -10px rgba\(56, 189, 248, 0\.2\)" \}\}/g;

const replacement = `className="p-8 rounded-[2rem] bg-white border border-slate-100 flex flex-col gap-5 shadow-sm transition-all duration-300 hover:border-sky-300 group h-full relative overflow-hidden backdrop-blur-sm"
                    whileHover={{ y: -8, scale: 1.02, boxShadow: "0 20px 40px -10px rgba(56, 189, 248, 0.2)" }}`;

if (content.match(regex)) {
  content = content.replace(regex, replacement);
  fs.writeFileSync(file, content);
  console.log('updated Mission Fix');
} else {
  console.log('Target not found for Mission Fix regex');
}
