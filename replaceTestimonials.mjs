import fs from 'fs';
const file = 'src/components/Testimonials.tsx';
let content = fs.readFileSync(file, 'utf8');

content = content.replace("import React from 'react';", "import React from 'react';\nimport { useTranslation } from 'react-i18next';");
content = content.replace("export default function Testimonials() {", "export default function Testimonials() {\n  const { t } = useTranslation();");
content = content.replace(/>دیدگاه متعلمین ما</g, ">{t('testimonials_title')}<");

fs.writeFileSync(file, content);
