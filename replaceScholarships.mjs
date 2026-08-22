import fs from 'fs';
const file = 'src/components/Scholarships.tsx';
let content = fs.readFileSync(file, 'utf8');

content = content.replace("import React, { useState, useEffect } from 'react';", "import React, { useState, useEffect } from 'react';\nimport { useTranslation } from 'react-i18next';");
content = content.replace("export default function Scholarships() {", "export default function Scholarships() {\n  const { t } = useTranslation();");
content = content.replace(/>بورسیه‌های تحصیلی معتبر</g, ">{t('scholarships_title')}<");
content = content.replace(/>بورسیه یافت شد</g, ">{t('scholarships_found')}<");
content = content.replace(/>فیلترهای جستجو:</g, ">{t('filters')}<");
content = content.replace(/>جنسیت</g, ">{t('gender')}<");
content = content.replace(/>مقطع تحصیلی</g, ">{t('degree_level')}<");
content = content.replace(/>شیوه برگزاری</g, ">{t('format')}<");
content = content.replace(/>پوشش مالی</g, ">{t('coverage')}<");
content = content.replace(/>کشور مقصد</g, ">{t('country')}<");
content = content.replace(/>معتبر</g, ">{t('verified')}<");
content = content.replace(/>جزئیات بورسیه</g, ">{t('scholarship_details')}<");
content = content.replace(/>ثبت نام</g, ">{t('apply_now')}<");
content = content.replace(/>بستن</g, ">{t('close')}<");
content = content.replace(/>تکمیل فرم درخواستی آنلاین در سایت مربوطه</g, ">{t('req1')}<");
content = content.replace(/>داشتن پاسپورت یا تذکره الکترونیکی معتبر</g, ">{t('req2')}<");
content = content.replace(/>هشدار ایمنی</g, ">{t('safety_warning')}<");
content = content.replace(/>لطفا در هنگام ثبت نام آنلاین از ارائه اطلاعات غیرضروری خودداری کنید\. تمام این بورسیه ها رایگان هستند و هرگز پولی درخواست نمی کنند\.</g, ">{t('safety_warning_desc')}<");
// also arrays:
content = content.replace(/\['همه', 'دخترانه', 'پسرانه'\]/g, "[t('all'), t('female'), t('male')]");
content = content.replace(/\['مکتب', 'لیسانس', 'ماستری', 'دکترا'\]/g, "[t('school'), t('bachelors'), t('masters'), t('phd')]");
content = content.replace(/\['حضوری', 'آنلاین'\]/g, "[t('in_person'), t('online')]");
content = content.replace(/\['کاملاً رایگان', 'بورسیه درصدی'\]/g, "[t('fully_funded'), t('partial_funded')]");
fs.writeFileSync(file, content);
