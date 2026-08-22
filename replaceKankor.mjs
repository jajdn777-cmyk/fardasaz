import fs from 'fs';
const file = 'src/pages/KankorPage.tsx';
let content = fs.readFileSync(file, 'utf8');

content = content.replace("import { motion } from 'motion/react';", "import { motion } from 'motion/react';\nimport { useTranslation } from 'react-i18next';");
content = content.replace("export default function KankorPage() {", "export default function KankorPage() {\n  const { t } = useTranslation();");
content = content.replace(/>آمادگی کانکور</g, ">{t('kankor_title')}<");
content = content.replace(/>مجموعه سوالات و راهنمایی‌ها</g, ">{t('kankor_subtitle')}<");
content = content.replace(/>فرم‌های سال‌های گذشته</g, ">{t('past_forms')}<");
content = content.replace(/>آموزش فشرده ریاضیات کانکور</g, ">{t('intensive_math')}<");
content = content.replace(/>نکات کلیدی فزیک و کیمیا</g, ">{t('physics_chem_notes')}<");
content = content.replace(/>رهنمای انتخاب رشته</g, ">{t('major_selection')}<");
content = content.replace(/>مشاهده و دریافت</g, ">{t('view_download')}<");
content = content.replace(/>ویدیو</g, ">{t('video')}<");
content = content.replace(/>مقاله</g, ">{t('article')}<");
fs.writeFileSync(file, content);
