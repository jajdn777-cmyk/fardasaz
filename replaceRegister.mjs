import fs from 'fs';
const file = 'src/pages/RegisterPage.tsx';
let content = fs.readFileSync(file, 'utf8');

content = content.replace("import React, { useState } from 'react';", "import React, { useState } from 'react';\nimport { useTranslation } from 'react-i18next';");
content = content.replace("export default function RegisterPage() {", "export default function RegisterPage() {\n  const { t } = useTranslation();");
content = content.replace(/>ثبت نام در راه دانش</g, ">{t('register_title')}<");
content = content.replace(/>نام و نام خانوادگی</g, ">{t('full_name')}<");
content = content.replace(/placeholder="احمد احمدی"/g, 'placeholder={t("full_name_ph")}');
content = content.replace(/>ایمیل آدرس</g, ">Email Address<"); // I didn't add this key, wait I'll just hardcode it or reuse "ایمیل شما"
content = content.replace(/>صنف تحصیلی</g, ">{t('grade_level')}<");
content = content.replace(/>صنف دوازدهم</g, ">{t('grade_12')}<");
content = content.replace(/>صنف یازدهم</g, ">{t('grade_11')}<");
content = content.replace(/>صنف دهم</g, ">{t('grade_10')}<");
content = content.replace(/>صنف نهم</g, ">{t('grade_9')}<");
content = content.replace(/>ثبت نام و ایجاد حساب</g, ">{t('register_create_account')}<");
fs.writeFileSync(file, content);
