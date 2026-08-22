import fs from 'fs';
const file = 'src/components/Footer.tsx';
let content = fs.readFileSync(file, 'utf8');

content = content.replace("import { motion } from 'motion/react';", "import { motion } from 'motion/react';\nimport { useTranslation } from 'react-i18next';");
content = content.replace("export default function Footer() {", "export default function Footer() {\n  const { t } = useTranslation();");
content = content.replace(/>راه دانش</g, ">{t('hero_title_main')}<");
content = content.replace(/>پلتفرمی مستقل و غیرانتفاعی برای دسترسی آزاد به منابع آموزشی، کتب درسی و بورسیه‌های تحصیلی برای تمام جوانان افغانستان\.</g, ">{t('footer_desc')}<");
content = content.replace(/>دسترسی سریع</g, ">{t('quick_links')}<");
content = content.replace(/>کتب درسی صنف ۱ تا ۱۲</g, ">{t('footer_textbooks')}<");
content = content.replace(/>بورسیه‌های معتبر جهانی</g, ">{t('footer_scholarships')}<");
content = content.replace(/>برنامه‌های آموزشی</g, ">{t('footer_videos')}<");
content = content.replace(/>درباره مأموریت ما</g, ">{t('footer_about')}<");
content = content.replace(/>تماس با ما \/ گزارش تخلف</g, ">{t('report_issue')}<");
content = content.replace(/>آیا کلاه‌برداری تحصیلی مشاهده کرده‌اید؟ یا پیشنهادی برای بهبود راه دانش دارید؟ با ما در تماس شوید\.</g, ">Have feedback? Let us know.<");
content = content.replace(/placeholder="ایمیل شما"/g, 'placeholder={t("your_email")}');
content = content.replace(/>ارسال پیام</g, ">{t('send_message')}<");
content = content.replace(/>قوانین استفاده</g, ">{t('terms_of_use')}<");
content = content.replace(/>حریم خصوصی</g, ">{t('privacy_policy')}<");
content = content.replace(/>© \{new Date\(\)\.getFullYear\(\)\} راه دانش - تمام حقوق برای دانش‌آموزان افغانستان محفوظ است\.</g, ">© {new Date().getFullYear()} {t('copyright')}<");
content = content.replace(/>پیوستن به کانال تلگرام:</g, ">Join Telegram:<");

fs.writeFileSync(file, content);
