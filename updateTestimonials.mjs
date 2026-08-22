import fs from 'fs';
const file = 'src/components/Testimonials.tsx';
let content = fs.readFileSync(file, 'utf8');

// Move testimonials out of the component
const targetArray = `  const testimonials = [
    {
      name: 'فاطمه احمدی',
      role: 'دانش‌آموز صنف دهم',
      text: 'راه دانش به من کمک کرد تا در این روزهای سخت، امیدم را برای ادامه تحصیل از دست ندهم. کلاس‌های آنلاین عالی هستند.',
    },
    {
      name: 'احمد رضایی',
      role: 'دانش‌آموز کانکوری',
      text: 'مواد درسی کانکور و آزمون‌های آزمایشی که در اینجا پیدا کردم، بسیار جامع و کاربردی بود. از همه اساتید ممنونم.',
    },
    {
      name: 'مریم سادات',
      role: 'دانش‌آموز صنف دوازدهم',
      text: 'دسترسی به تمام کتاب‌های درسی به صورت یکجا و رایگان خیلی به من کمک کرده است. ممنون از راه دانش.',
    }
  ];`;

if (content.includes(targetArray)) {
  content = content.replace(targetArray, "");
  // Insert before export default function Testimonials()
  const insertPos = content.indexOf("export default function Testimonials()");
  content = content.slice(0, insertPos) + targetArray.trim() + "\n\n" + content.slice(insertPos);
}

// Rename map variable to item to avoid shadowing t
content = content.replace(/testimonials\.map\(\(t, idx\)/g, "testimonials.map((item, idx)");
content = content.replace(/\{t\.text\}/g, "{item.text}");
content = content.replace(/\{t\.name\[0\]\}/g, "{item.name[0]}");
content = content.replace(/\{t\.name\}/g, "{item.name}");
content = content.replace(/\{t\.role\}/g, "{item.role}");

// Wrap with React.memo
if (!content.includes('memo(')) {
  content = content.replace("import React from 'react';", "import React, { memo } from 'react';");
  content = content.replace("export default function Testimonials()", "const Testimonials = memo(function Testimonials()");
  // Find the end of the file
  content = content.replace(/}\s*$/, "});\nexport default Testimonials;");
}

fs.writeFileSync(file, content);
console.log("Updated Testimonials.tsx");
