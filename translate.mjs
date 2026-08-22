import fs from 'fs';
import path from 'path';

const localesDir = path.resolve('src/locales');

const translations = {
  nav_home: { fa: 'صفحه اصلی', ps: 'کور پاڼه', en: 'Home', uz: 'Bosh sahifa' },
  nav_about: { fa: 'معرفی و ارتباطات', ps: 'پیژندنه او اړیکې', en: 'About & Contact', uz: 'Haqida va Aloqa' },
  nav_classes: { fa: 'دروس آنلاین', ps: 'آنلاین درسونه', en: 'Online Classes', uz: 'Onlayn Darslar' },
  nav_kankor: { fa: 'آمادگی کانکور', ps: 'کانکور چمتووالی', en: 'Kankor Prep', uz: 'Kankor Tayyorgarlik' },
  nav_library: { fa: 'کتابخانه', ps: 'کتابتون', en: 'Library', uz: 'Kutubxona' },
  nav_scholarships: { fa: 'بورسیه‌ها', ps: 'بورسونه', en: 'Scholarships', uz: 'Stipendiyalar' },
  register_rahe_danesh: { fa: 'ثبت نام راه دانش', ps: 'د راه دانش نوم لیکنه', en: 'Register for Rahe Danesh', uz: 'Rahe Danesh-ga ro\'yxatdan o\'tish' },
  register: { fa: 'ثبت نام', ps: 'نوم لیکنه', en: 'Register', uz: 'Ro\'yxatdan o\'tish' },
  // Hero section
  hero_title_highlight: { fa: 'پلتفرم جامع آموزشی', ps: 'د زده کړې جامع پلیټ فارم', en: 'Comprehensive Learning Platform', uz: 'Keng qamrovli ta\'lim platformasi' },
  hero_title_main: { fa: 'راه دانش', ps: 'راه دانش', en: 'Rahe Danesh', uz: 'Rahe Danesh' },
  hero_subtitle: { fa: 'پلتفرم جامع آموزشی برای دانش‌آموزان افغانستان. دسترسی رایگان به دروس مکتب، آمادگی کانکور، کتابخانه دیجیتال و فرصت‌های تحصیلی.', ps: 'د افغانستان زده کوونکو لپاره د زده کړې جامع پلیټ فارم. د ښوونځي درسونو، کانکور چمتووالي، ډیجیټل کتابتون او د زده کړې فرصتونو ته وړیا لاسرسی.', en: 'A comprehensive educational platform for students in Afghanistan. Free access to school lessons, university entrance exam prep, digital library, and educational opportunities.', uz: 'Afg\'onistondagi talabalar uchun keng qamrovli ta\'lim platformasi. Maktab darslari, universitetga kirish imtihonlariga tayyorgarlik, raqamli kutubxona va ta\'lim imkoniyatlariga bepul kirish.' },
  start_learning: { fa: 'شروع یادگیری', ps: 'زده کړه پیل کړئ', en: 'Start Learning', uz: 'O\'qishni boshlang' },
  explore_library: { fa: 'کاوش در کتابخانه', ps: 'کتابتون ولټوئ', en: 'Explore Library', uz: 'Kutubxonani o\'rganing' },
  active_students: { fa: 'دانش‌آموز فعال', ps: 'فعال زده کوونکی', en: 'Active Students', uz: 'Faol talabalar' },
  video_lessons: { fa: 'ویدیوی آموزشی', ps: 'ښوونیز ویډیو', en: 'Video Lessons', uz: 'Video darslar' },
  books: { fa: 'کتاب درسی و داستانی', ps: 'درسي او کیسه ایز کتابونه', en: 'Textbooks & Storybooks', uz: 'Darsliklar va Hikoyalar' },
  // Features (Mission)
  features_title: { fa: 'امکانات پلتفرم راه دانش', ps: 'د راه دانش پلیټ فارم امکانات', en: 'Rahe Danesh Platform Features', uz: 'Rahe Danesh Platformasi Imkoniyatlari' },
  features_subtitle: { fa: 'ما تمام ابزارهای لازم برای موفقیت تحصیلی شما را در یک مکان فراهم کرده‌ایم.', ps: 'موږ ستاسو د تحصیلي بریا لپاره ټول اړین وسایل په یو ځای کې برابر کړي دي.', en: 'We have provided all the tools you need for academic success in one place.', uz: 'Biz sizning o\'qishdagi muvaffaqiyatingiz uchun barcha kerakli vositalarni bir joyda taqdim etdik.' },
  feature_classes: { fa: 'دروس آنلاین', ps: 'آنلاین درسونه', en: 'Online Classes', uz: 'Onlayn Darslar' },
  feature_classes_desc: { fa: 'آموزش ویدیویی تمام مضامین مکتب از صنف اول تا دوازدهم مطابق نصاب وزارت معارف', ps: 'د پوهنې وزارت د نصاب سره سم له لومړي څخه تر دولسم ټولګي پورې د ټولو مضمونونو ویډیويي زده کړه', en: 'Video instruction for all school subjects from grades 1 to 12 according to the Ministry of Education curriculum', uz: 'Ta\'lim vazirligi o\'quv dasturiga muvofiq 1-12-sinflargacha bo\'lgan barcha maktab fanlari bo\'yicha video darslar' },
  feature_kankor: { fa: 'آمادگی کانکور', ps: 'کانکور چمتووالی', en: 'Kankor Prep', uz: 'Kankor Tayyorgarlik' },
  feature_kankor_desc: { fa: 'بانک سوالات، امتحانات آزمایشی و ویدیوهای حل فرم‌های سال‌های گذشته', ps: 'د پوښتنو بانک، آزمایښتي ازموینې او د تیرو کلونو د فورمو حل ویډیوګانې', en: 'Question banks, practice exams, and videos solving past year exam papers', uz: 'Savollar banki, amaliy imtihonlar va o\'tgan yilgi imtihon qog\'ozlarini yechish videolari' },
  feature_library: { fa: 'کتابخانه دیجیتال', ps: 'ډیجیټل کتابتون', en: 'Digital Library', uz: 'Raqamli Kutubxona' },
  feature_library_desc: { fa: 'دسترسی به هزاران کتاب درسی، ممد درسی، رمان و کتاب‌های علمی به صورت رایگان', ps: 'زرګونو درسي، مرستندوی، ناول او علمي کتابونو ته وړیا لاسرسی', en: 'Free access to thousands of textbooks, supplementary materials, novels, and scientific books', uz: 'Minglab darsliklar, qo\'shimcha materiallar, romanlar va ilmiy kitoblarga bepul kirish' },
  feature_scholarships: { fa: 'فرصت‌های تحصیلی', ps: 'د زده کړې فرصتونه', en: 'Educational Opportunities', uz: 'Ta\'lim imkoniyatlari' },
  feature_scholarships_desc: { fa: 'اطلاع‌رسانی بروز در مورد بورسیه‌های تحصیلی جهان و راهنمای ثبت نام', ps: 'د نړۍ د تحصیلي بورسونو په اړه تازه معلومات او د نوم لیکنې لارښود', en: 'Up-to-date information on global scholarships and registration guides', uz: 'Jahon stipendiyalari haqida eng so\'nggi ma\'lumotlar va ro\'yxatdan o\'tish bo\'yicha qo\'llanmalar' }
};

const buildLocale = (lang) => {
  const result = {};
  for (const [key, t] of Object.entries(translations)) {
    result[key] = t[lang] || t['fa'];
  }
  fs.writeFileSync(path.join(localesDir, `${lang}.json`), JSON.stringify(result, null, 2));
};

['fa', 'ps', 'en', 'uz'].forEach(buildLocale);
console.log('Translations generated.');
