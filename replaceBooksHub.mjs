import fs from 'fs';
const file = 'src/components/BooksHub.tsx';
let content = fs.readFileSync(file, 'utf8');

content = content.replace("import React, { useState } from 'react';", "import React, { useState } from 'react';\nimport { useTranslation } from 'react-i18next';");
content = content.replace("export default function BooksHub() {", "export default function BooksHub() {\n  const { t } = useTranslation();");
content = content.replace(/>کتابخانه آنلاین راه دانش</g, ">{t('books_title')}<");
content = content.replace(/>دسترسی رایگان به کتب درسی مکتب</g, ">{t('books_subtitle')}<");
content = content.replace(/'همه'/g, "t('all')");
content = content.replace(/'صنف ۱۲'/g, "t('grade_12')");
content = content.replace(/'صنف ۱۱'/g, "t('grade_11')");
content = content.replace(/'صنف ۱۰'/g, "t('grade_10')");
content = content.replace(/'صنف ۹'/g, "t('grade_9')");
content = content.replace(/'کتاب های مکتب'/g, "t('category_textbooks')");
content = content.replace(/>همه</g, ">{t('all')}<");
content = content.replace(/>دانلود</g, ">{t('download')}<");
content = content.replace(/>کتابی یافت نشد\.</g, ">{t('no_books_found')}<");
fs.writeFileSync(file, content);
