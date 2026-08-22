import fs from 'fs';
import path from 'path';

const localesDir = path.resolve('src/locales');
const langs = ['fa', 'ps', 'en', 'uz'];

const tData = {
  hero_slide1_title: { fa: 'راه دانش؛ پنجره‌ای به سوی', ps: 'راه دانش؛ یوه کړکۍ په لور د', en: 'Rahe Danesh; A Window to', uz: 'Rahe Danesh; Quyidagilarga darcha' },
  hero_slide1_highlight: { fa: 'آموزش آزاد', ps: 'آزادو زده کړو', en: 'Free Education', uz: 'Bepul ta\'lim' },
  hero_slide1_subtitle: { fa: 'دسترسی رایگان به کتب درسی رسمی افغانستان، بورسیه‌های تحصیلی و دروس آنلاین برای همه.', ps: 'د افغانستان رسمي درسي کتابونو، بورسونو او آنلاین درسونو ته وړیا لاسرسی د ټولو لپاره.', en: 'Free access to official Afghan textbooks, scholarships, and online classes for everyone.', uz: 'Rasmiy Afg\'on darsliklari, stipendiyalar va barcha uchun onlayn darslarga bepul kirish.' },
  hero_slide1_btn1: { fa: 'جستجوی کتاب‌های درسی', ps: 'د درسي کتابونو لټون', en: 'Search Textbooks', uz: 'Darsliklarni qidirish' },
  hero_slide1_btn2: { fa: 'مشاهده دروس آنلاین', ps: 'د آنلاین درسونو لیدل', en: 'View Online Classes', uz: 'Onlayn darslarni ko\'rish' },
  
  hero_slide2_title: { fa: 'آینده افغانستان در', ps: 'د افغانستان راتلونکی په', en: 'The Future of Afghanistan is in', uz: 'Afg\'onistonning kelajagi sizning' },
  hero_slide2_highlight: { fa: 'دستان شماست', ps: 'ستاسو په لاسونو کې دی', en: 'Your Hands', uz: 'Qo\'llaringizda' },
  hero_slide2_subtitle: { fa: 'با آموزش رایگان و حمایت از استعدادها، مسیر موفقیت را برای خود و جامعه هموار کنید.', ps: 'د وړیا زده کړې او استعدادونو د ملاتړ سره، د ځان او ټولنې لپاره د بریا لاره هواره کړئ.', en: 'With free education and support for talents, pave the way to success for yourself and society.', uz: 'Bepul ta\'lim va iste\'dodlarni qo\'llab-quvvatlash orqali o\'zingiz va jamiyat uchun muvaffaqiyat yo\'lini oching.' },
  hero_slide2_btn1: { fa: 'آمادگی کانکور', ps: 'د کانکور چمتووالی', en: 'Kankor Prep', uz: 'Kankor tayyorgarligi' },
  hero_slide2_btn2: { fa: 'بورسیه‌های تحصیلی', ps: 'تحصیلي بورسونه', en: 'Scholarships', uz: 'Stipendiyalar' },

  hero_slide3_title: { fa: 'حق تحصیل برای همه', ps: 'د زده کړې حق د ټولو لپاره', en: 'The Right to Education for All', uz: 'Barcha uchun ta\'lim huquqi' },
  hero_slide3_highlight: { fa: 'به شکل مساوی', ps: 'په مساوي توګه', en: 'Equally', uz: 'Teng ravishda' },
  hero_slide3_subtitle: { fa: 'ما معتقدیم آموزش یک حق ابتدایی است. با ما در ساختن افغانستانی آباد هم‌قدم شوید.', ps: 'موږ باور لرو چې زده کړه یو بنسټیز حق دی. له موږ سره د یو آباد افغانستان په جوړولو کې ګام پورته کړئ.', en: 'We believe education is a fundamental right. Join us in building a prosperous Afghanistan.', uz: 'Biz ta\'lim fundamental huquq ekanligiga ishonamiz. Gullab-yashnayotgan Afg\'onistonni qurishda bizga qo\'shiling.' },
  hero_slide3_btn1: { fa: 'ثبت نام در راه دانش', ps: 'په راه دانش کې نوم لیکنه', en: 'Register in Rahe Danesh', uz: 'Rahe Danesh-da ro\'yxatdan o\'ting' },
  hero_slide3_btn2: { fa: 'درباره ما', ps: 'زموږ په اړه', en: 'About Us', uz: 'Biz haqimizda' }
};

langs.forEach(lang => {
  const file = path.join(localesDir, `${lang}.json`);
  let data = {};
  if (fs.existsSync(file)) {
    data = JSON.parse(fs.readFileSync(file, 'utf8'));
  }
  for (const [k, v] of Object.entries(tData)) {
    data[k] = v[lang];
  }
  fs.writeFileSync(file, JSON.stringify(data, null, 2));
});
