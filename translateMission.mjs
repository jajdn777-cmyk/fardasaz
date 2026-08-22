import fs from 'fs';
import path from 'path';

const localesDir = path.resolve('src/locales');
const langs = ['fa', 'ps', 'en', 'uz'];

const tData = {
  mission_about_us: { fa: 'درباره ما', ps: 'زموږ په اړه', en: 'About Us', uz: 'Biz haqimizda' },
  mission_welcome: { fa: 'به راه دانش خوش آمدید', ps: 'راه دانش ته ښه راغلاست', en: 'Welcome to Rahe Danesh', uz: 'Rahe Danesh-ga xush kelibsiz' },
  mission_desc1: { fa: 'افغانستان را تنها با علم و دانش میشود بسوی پیشرفت، ترقی و تعالی ببریم. ما معتقد به حق تحصیل و تعلیم برای همه هستیم. در همین راستا با جمعی بزرگ مکتب آنلاین افغانستان را راه‌اندازی و زمینه آموزش و دسترسی به آموزش به شکل آنلاین و کاملا رایگان را برای همه فراهم میسازیم.', ps: 'افغانستان یوازې په علم او پوهې سره د پرمختګ او سوکالۍ په لور بیولی شو. موږ د ټولو لپاره د زده کړې په حق باور لرو. په همدې اساس مو له یوې لویې ډلې سره د افغانستان آنلاین ښوونځی جوړ کړی او ټولو ته مو په بشپړه توګه وړیا او آنلاین زده کړو ته د لاسرسي زمینه برابره کړې ده.', en: 'We can only lead Afghanistan towards progress, development, and excellence through science and knowledge. We believe in the right to education for all. In this regard, together with a large group, we have launched the Online School of Afghanistan, providing free access to online education for everyone.', uz: 'Biz Afg\'onistonni faqat ilm va bilim orqali taraqqiyot va barkamollik sari yetaklay olamiz. Biz barcha uchun ta\'lim olish huquqiga ishonamiz. Shu munosabat bilan, katta bir guruh bilan birgalikda Afg\'oniston onlayn maktabini ishga tushirdik, bu orqali barchaga onlayn ta\'lim olish imkoniyatini mutlaqo bepul taqdim etmoqdamiz.' },
  mission_desc2: { fa: 'این حرکت تنها با حمایت شما میتواند به هدف اصلی آن که حق تحصیل برای همه به شکل مساوی است برسد. شما میتوانید در بخش‌های ذیل با ما همکاری کنید:', ps: 'دا حرکت یوازې ستاسو په ملاتړ کولی شي خپل اصلي هدف ته ورسیږي چې د ټولو لپاره په مساوي توګه د زده کړې حق دی. تاسو کولی شئ په لاندې برخو کې له موږ سره همکاري وکړئ:', en: 'This movement can only achieve its main goal, which is the right to education for all equally, with your support. You can collaborate with us in the following areas:', uz: 'Ushbu harakat faqatgina sizning qo\'llab-quvvatlashingiz bilan barcha uchun teng ta\'lim huquqi degan asosiy maqsadiga erisha oladi. Biz bilan quyidagi yo\'nalishlarda hamkorlik qilishingiz mumkin:' },
  mission_li1: { fa: 'تدریس مضامین مکتب', ps: 'د ښوونځي د مضامینو تدریس', en: 'Teaching school subjects', uz: 'Maktab fanlarini o\'qitish' },
  mission_li2: { fa: 'حل مشکلات متعلمین و ارزیابی کارخانگی', ps: 'د زده کوونکو د ستونزو حل او د کورنۍ دندې ارزونه', en: 'Solving students\' problems and evaluating homework', uz: 'O\'quvchilar muammolarini hal qilish va uy vazifalarini baholash' },
  mission_li3: { fa: 'تهیه محتوای آموزشی', ps: 'د ښوونیزو منځپانګو چمتو کول', en: 'Preparing educational content', uz: 'Ta\'limiy kontent tayyorlash' },
  mission_li4: { fa: 'همکاری تخنیکی در وب‌سایت و گرافیک', ps: 'په ویب پاڼه او ګرافیک کې تخنیکي همکاري', en: 'Technical collaboration in website and graphics', uz: 'Veb-sayt va grafikada texnik hamkorlik' },
  mission_li5: { fa: 'خبر رسانی و حمایت مالی از راه دانش', ps: 'د راه دانش خبر رسول او مالي ملاتړ', en: 'Informing and financially supporting Rahe Danesh', uz: 'Rahe Danesh haqida xabar berish va moliyaviy qo\'llab-quvvatlash' },
  mission_make_change: { fa: 'همراه با ما تغییر ایجاد کنید', ps: 'له موږ سره بدلون رامنځته کړئ', en: 'Make a change with us', uz: 'Biz bilan o\'zgarish qiling' },
  mission_services_title: { fa: 'خدمات راه دانش', ps: 'د راه دانش خدمات', en: 'Rahe Danesh Services', uz: 'Rahe Danesh Xizmatlari' },
  srv_classes_title: { fa: 'دروس مکتب', ps: 'د ښوونځي درسونه', en: 'School Classes', uz: 'Maktab Darslari' },
  srv_classes_desc: { fa: 'راجستر و وارد شدن به سیستم', ps: 'سیسټم ته نوم لیکنه او ننوتل', en: 'Register and log into the system', uz: 'Tizimga ro\'yxatdan o\'tish va kirish' },
  srv_library_title: { fa: 'کتابخانه آنلاین', ps: 'آنلاین کتابتون', en: 'Online Library', uz: 'Onlayn Kutubxona' },
  srv_library_desc: { fa: 'کتاب های مکتب و بیشتر', ps: 'د ښوونځي کتابونه او نور', en: 'School books and more', uz: 'Maktab kitoblari va boshqalar' },
  srv_kankor_title: { fa: 'آمادگی کانکور', ps: 'د کانکور چمتووالی', en: 'Kankor Prep', uz: 'Kankor Tayyorgarlik' },
  srv_kankor_desc: { fa: 'مواد درسی کانکوری', ps: 'د کانکور درسي مواد', en: 'Kankor study materials', uz: 'Kankor o\'quv materiallari' },
  srv_other_title: { fa: 'آموزش دیگر', ps: 'نورې زده کړې', en: 'Other Education', uz: 'Boshqa Ta\'lim' },
  srv_other_desc: { fa: 'آموزش زبان ها، کمپیوتر و...', ps: 'د ژبو، کمپیوټر او... زده کړه', en: 'Language, computer education, etc.', uz: 'Til, kompyuter ta\'limi va boshqalar' }
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
