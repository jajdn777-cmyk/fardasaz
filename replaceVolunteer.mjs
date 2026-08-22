import fs from 'fs';
const file = 'src/components/Volunteer.tsx';
let content = fs.readFileSync(file, 'utf8');

content = content.replace("import React, { useState, useEffect } from 'react';", "import React, { useState, useEffect } from 'react';\nimport { useTranslation } from 'react-i18next';");
content = content.replace("export default function Volunteer() {", "export default function Volunteer() {\n  const { t } = useTranslation();");
content = content.replace(/>صنف‌های آموزشی و داوطلبان</g, ">{t('volunteer_title')}<");
content = content.replace(/>پیوستن به صنف</g, ">{t('join_class')}<");
content = content.replace(/>در حال حاضر داوطلبی ثبت نشده است\.</g, ">{t('no_volunteers')}<");
content = content.replace(/>ثبت نام به عنوان مدرس</g, ">{t('register_as_teacher')}<");
content = content.replace(/>چه چیزی می‌خواهید تدریس کنید؟</g, ">{t('what_to_teach')}<");
content = content.replace(/>\+۲۰۰ داوطلب فعال</g, ">{t('active_volunteers')}<");
content = content.replace(/>لیست داوطلبان</g, ">{t('volunteers_list')}<");
content = content.replace(/>نام و تخلص</g, ">{t('name_surname')}<");
content = content.replace(/>مضمون تدریس</g, ">{t('teaching_subject')}<");
content = content.replace(/>ایمیل یا شماره واتساپ</g, ">{t('email_whatsapp')}<");
content = content.replace(/>ارسال درخواست</g, ">{t('submit_request')}<");
content = content.replace(/placeholder="مثال: احمد احمدی"/g, 'placeholder={t("full_name_ph")}');
content = content.replace(/placeholder="ریاضیات، فزیک، زبان انگلیسی..."/g, 'placeholder="Math, Physics, English..."');
content = content.replace(/placeholder="مثال: ahmad@example\.com"/g, 'placeholder={t("email_ph")}');

fs.writeFileSync(file, content);
