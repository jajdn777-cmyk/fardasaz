import fs from 'fs';
import path from 'path';

const localesDir = path.resolve('src/locales');
const langs = ['fa', 'ps', 'en', 'uz'];

const tData = {
  // BooksHub
  books_title: { fa: 'کتابخانه آنلاین راه دانش', ps: 'د راه دانش آنلاین کتابتون', en: 'Rahe Danesh Online Library', uz: 'Rahe Danesh Onlayn Kutubxonasi' },
  books_subtitle: { fa: 'دسترسی رایگان به کتب درسی مکتب', ps: 'د ښوونځي درسي کتابونو ته وړیا لاسرسی', en: 'Free access to school textbooks', uz: 'Maktab darsliklariga bepul kirish' },
  all: { fa: 'همه', ps: 'ټول', en: 'All', uz: 'Barchasi' },
  grade_12: { fa: 'صنف ۱۲', ps: '۱۲ ټولګی', en: 'Grade 12', uz: '12-sinf' },
  grade_11: { fa: 'صنف ۱۱', ps: '۱۱ ټولګی', en: 'Grade 11', uz: '11-sinf' },
  grade_10: { fa: 'صنف ۱۰', ps: '۱۰ ټولګی', en: 'Grade 10', uz: '10-sinf' },
  grade_9: { fa: 'صنف ۹', ps: '۹ ټولګی', en: 'Grade 9', uz: '9-sinf' },
  category_textbooks: { fa: 'کتاب های مکتب', ps: 'د ښوونځي کتابونه', en: 'School Textbooks', uz: 'Maktab Darsliklari' },
  download: { fa: 'دانلود', ps: 'کښته کول', en: 'Download', uz: 'Yuklab olish' },
  no_books_found: { fa: 'کتابی یافت نشد.', ps: 'کتاب ونه موندل شو.', en: 'No books found.', uz: 'Kitoblar topilmadi.' },

  // Footer
  footer_desc: { fa: 'پلتفرم جامع آموزشی برای دانش‌آموزان افغانستان.', ps: 'د افغانستان زده کوونکو لپاره د زده کړې جامع پلیټ فارم.', en: 'Comprehensive educational platform for students in Afghanistan.', uz: 'Afg\'onistondagi talabalar uchun keng qamrovli ta\'lim platformasi.' },
  quick_links: { fa: 'دسترسی سریع', ps: 'چټک لاسرسی', en: 'Quick Links', uz: 'Tezkor Havolalar' },
  footer_textbooks: { fa: 'کتب درسی صنف ۱ تا ۱۲', ps: 'له ۱ تر ۱۲ ټولګي درسي کتابونه', en: 'Grades 1-12 Textbooks', uz: '1-12-sinf Darsliklari' },
  footer_scholarships: { fa: 'بورسیه‌های معتبر جهانی', ps: 'نړیوال معتبر بورسونه', en: 'Global Scholarships', uz: 'Global Stipendiyalar' },
  footer_videos: { fa: 'ویدیوهای آموزشی', ps: 'ښوونیزې ویډیوګانې', en: 'Educational Videos', uz: 'Ta\'limiy Videolar' },
  footer_about: { fa: 'درباره مأموریت ما', ps: 'زموږ د ماموریت په اړه', en: 'About Our Mission', uz: 'Bizning Missiyamiz Haqida' },
  report_issue: { fa: 'گزارش تخلف یا مشکل', ps: 'د ستونزې راپور', en: 'Report an Issue', uz: 'Muammoni Xabar Qilish' },
  your_email: { fa: 'ایمیل شما', ps: 'ستاسو بریښنالیک', en: 'Your Email', uz: 'Elektron pochtangiz' },
  send_message: { fa: 'ارسال پیام', ps: 'پیغام لیږل', en: 'Send Message', uz: 'Xabar Yuborish' },
  terms_of_use: { fa: 'قوانین استفاده', ps: 'د کارولو اصول', en: 'Terms of Use', uz: 'Foydalanish shartlari' },
  privacy_policy: { fa: 'حریم خصوصی', ps: 'د محرمیت تګلاره', en: 'Privacy Policy', uz: 'Maxfiylik Siyosati' },
  copyright: { fa: 'تمامی حقوق برای پلتفرم راه دانش محفوظ است.', ps: 'ټول حقونه د راه دانش پلیټ فارم لپاره خوندي دي.', en: 'All rights reserved to Rahe Danesh Platform.', uz: 'Barcha huquqlar Rahe Danesh Platformasiga tegishli.' },

  // Testimonials
  testimonials_title: { fa: 'دیدگاه متعلمین ما', ps: 'زموږ د زده کوونکو نظریات', en: 'Our Students\' Feedback', uz: 'Bizning O\'quvchilar Fikrlari' },

  // Volunteer
  volunteer_title: { fa: 'صنف‌های آموزشی و داوطلبان', ps: 'ښوونیز ټولګي او رضاکاران', en: 'Educational Classes & Volunteers', uz: 'Ta\'lim Darslari va Ko\'ngillilar' },
  join_class: { fa: 'پیوستن به صنف', ps: 'ټولګي سره یوځای کیدل', en: 'Join Class', uz: 'Darsga Qo\'shilish' },
  no_volunteers: { fa: 'در حال حاضر داوطلبی ثبت نشده است.', ps: 'دمګړۍ هیڅ رضاکار نه دی ثبت شوی.', en: 'Currently no volunteers registered.', uz: 'Hozircha ko\'ngillilar ro\'yxatdan o\'tmagan.' },
  register_as_teacher: { fa: 'ثبت نام به عنوان مدرس', ps: 'د ښوونکي په توګه نوم لیکنه', en: 'Register as Teacher', uz: 'O\'qituvchi sifatida ro\'yxatdan o\'tish' },
  what_to_teach: { fa: 'چه چیزی می‌خواهید تدریس کنید؟', ps: 'څه شی غواړئ تدریس کړئ؟', en: 'What do you want to teach?', uz: 'Nimani o\'rgatmoqchisiz?' },
  active_volunteers: { fa: '+۲۰۰ داوطلب فعال', ps: '+۲۰۰ فعال رضاکاران', en: '+200 Active Volunteers', uz: '+200 Faol Ko\'ngillilar' },
  volunteers_list: { fa: 'لیست داوطلبان', ps: 'د رضاکارانو نوملړ', en: 'Volunteers List', uz: 'Ko\'ngillilar Ro\'yxati' },
  name_surname: { fa: 'نام و تخلص', ps: 'نوم او تخلص', en: 'Name and Surname', uz: 'Ism va Familiya' },
  teaching_subject: { fa: 'مضمون تدریس', ps: 'د تدریس مضمون', en: 'Teaching Subject', uz: 'O\'qitish Fani' },
  email_whatsapp: { fa: 'ایمیل یا شماره واتساپ', ps: 'بریښنالیک یا واټساپ شمیره', en: 'Email or WhatsApp', uz: 'Email yoki WhatsApp' },
  submit_request: { fa: 'ارسال درخواست', ps: 'غوښتنلیک لیږل', en: 'Submit Request', uz: 'So\'rov yuborish' },

  // Kankor
  kankor_title: { fa: 'آمادگی کانکور', ps: 'د کانکور چمتووالی', en: 'Kankor Preparation', uz: 'Kankor Tayyorgarlik' },
  kankor_subtitle: { fa: 'مجموعه سوالات و راهنمایی‌ها', ps: 'د پوښتنو او لارښوونو ټولګه', en: 'Questions and Guides Collection', uz: 'Savollar va Qo\'llanmalar To\'plami' },
  view_download: { fa: 'مشاهده و دریافت', ps: 'لیدل او ترلاسه کول', en: 'View & Download', uz: 'Ko\'rish va Yuklab Olish' },
  past_forms: { fa: 'فرم‌های سال‌های گذشته', ps: 'د تیرو کلونو فورمې', en: 'Past Years Forms', uz: 'O\'tgan Yillar Shakllari' },
  intensive_math: { fa: 'آموزش فشرده ریاضیات کانکور', ps: 'د کانکور د ریاضیاتو چټکه زده کړه', en: 'Intensive Kankor Math', uz: 'Kankor Matematikasi Intensiv' },
  physics_chem_notes: { fa: 'نکات کلیدی فزیک و کیمیا', ps: 'د فزیک او کیمیا مهم ټکي', en: 'Physics & Chemistry Key Notes', uz: 'Fizika va Kimyo Asosiy Eslatmalari' },
  major_selection: { fa: 'رهنمای انتخاب رشته', ps: 'د څانګې انتخابولو لارښود', en: 'Major Selection Guide', uz: 'Mutaxassislik Tanlash Qo\'llanmasi' },
  video: { fa: 'ویدیو', ps: 'ویډیو', en: 'Video', uz: 'Video' },
  article: { fa: 'مقاله', ps: 'مقاله', en: 'Article', uz: 'Maqola' },

  // Register
  register_title: { fa: 'ثبت نام در راه دانش', ps: 'په راه دانش کې نوم لیکنه', en: 'Register in Rahe Danesh', uz: 'Rahe Danesh-ga ro\'yxatdan o\'tish' },
  full_name: { fa: 'نام و نام خانوادگی', ps: 'نوم او تخلص', en: 'Full Name', uz: 'To\'liq Ism' },
  full_name_ph: { fa: 'مثال: احمد احمدی', ps: 'مثال: احمد احمدي', en: 'e.g. Ahmad Ahmadi', uz: 'masalan, Ahmad Ahmadi' },
  email_ph: { fa: 'مثال: ahmad@example.com', ps: 'مثال: ahmad@example.com', en: 'e.g. ahmad@example.com', uz: 'masalan, ahmad@example.com' },
  grade_level: { fa: 'صنف تحصیلی', ps: 'تعلیمي ټولګی', en: 'Grade Level', uz: 'Sinf darajasi' },
  register_create_account: { fa: 'ثبت نام و ایجاد حساب', ps: 'نوم لیکنه او حساب جوړول', en: 'Register & Create Account', uz: 'Ro\'yxatdan o\'tish va Hisob Yaratish' },

  // Scholarships
  scholarships_title: { fa: 'بورسیه‌های تحصیلی معتبر', ps: 'معتبر تحصیلي بورسونه', en: 'Prestigious Scholarships', uz: 'Nufuzli Stipendiyalar' },
  scholarships_found: { fa: 'بورسیه یافت شد', ps: 'بورسونه وموندل شول', en: 'scholarships found', uz: 'stipendiyalar topildi' },
  filters: { fa: 'فیلترهای جستجو:', ps: 'د لټون فلټرونه:', en: 'Search Filters:', uz: 'Qidiruv Filtrlari:' },
  gender: { fa: 'جنسیت', ps: 'جنسیت', en: 'Gender', uz: 'Jins' },
  female: { fa: 'دخترانه', ps: 'نجونې', en: 'Female', uz: 'Ayollar uchun' },
  male: { fa: 'پسرانه', ps: 'هلکان', en: 'Male', uz: 'Erkaklar uchun' },
  degree_level: { fa: 'مقطع تحصیلی', ps: 'د زده کړې کچه', en: 'Degree Level', uz: 'Daraja darajasi' },
  school: { fa: 'مکتب', ps: 'ښوونځی', en: 'School', uz: 'Maktab' },
  bachelors: { fa: 'لیسانس', ps: 'لیسانس', en: 'Bachelors', uz: 'Bakalavr' },
  masters: { fa: 'ماستری', ps: 'ماستري', en: 'Masters', uz: 'Magistr' },
  phd: { fa: 'دکترا', ps: 'دوکتورا', en: 'PhD', uz: 'PhD' },
  format: { fa: 'شیوه برگزاری', ps: 'د ترسره کیدو بڼه', en: 'Format', uz: 'Format' },
  in_person: { fa: 'حضوری', ps: 'حضوري', en: 'In-person', uz: 'Shaxsiy' },
  online: { fa: 'آنلاین', ps: 'آنلاین', en: 'Online', uz: 'Onlayn' },
  coverage: { fa: 'پوشش مالی', ps: 'مالي پوښښ', en: 'Financial Coverage', uz: 'Moliyaviy Qoplama' },
  fully_funded: { fa: 'کاملاً رایگان', ps: 'بشپړ وړیا', en: 'Fully Funded', uz: 'To\'liq Moliyalashtirilgan' },
  partial_funded: { fa: 'بورسیه درصدی', ps: 'فیصدي بورس', en: 'Partial Scholarship', uz: 'Qisman Stipendiya' },
  country: { fa: 'کشور مقصد', ps: 'د موخې هیواد', en: 'Destination Country', uz: 'Maqsad Mamlakati' },
  verified: { fa: 'معتبر', ps: 'معتبر', en: 'Verified', uz: 'Tasdiqlangan' },
  scholarship_details: { fa: 'جزئیات بورسیه', ps: 'د بورس جزییات', en: 'Scholarship Details', uz: 'Stipendiya Tafsilotlari' },
  close: { fa: 'بستن', ps: 'تړل', en: 'Close', uz: 'Yopish' },
  apply_now: { fa: 'ثبت نام', ps: 'نوم لیکنه', en: 'Apply Now', uz: 'Hozir Topshiring' },
  req1: { fa: 'تکمیل فرم درخواستی آنلاین در سایت مربوطه', ps: 'په اړونده سایټ کې د آنلاین غوښتنلیک ډکول', en: 'Complete online application on the official site', uz: 'Rasmiy saytda onlayn arizani to\'ldiring' },
  req2: { fa: 'داشتن پاسپورت یا تذکره الکترونیکی معتبر', ps: 'د معتبر پاسپورت یا بریښنایی پیژندپاڼې درلودل', en: 'Have a valid passport or electronic ID', uz: 'Yaroqli pasport yoki elektron guvohnomaga ega bo\'lish' },
  safety_warning: { fa: 'هشدار ایمنی', ps: 'د خوندیتوب خبرداری', en: 'Safety Warning', uz: 'Xavfsizlik Ogohlantirishi' },
  safety_warning_desc: { fa: 'لطفا در هنگام ثبت نام آنلاین از ارائه اطلاعات غیرضروری خودداری کنید. تمام این بورسیه ها رایگان هستند و هرگز پولی درخواست نمی کنند.', ps: 'مهرباني وکړئ د آنلاین نوم لیکنې پر مهال د غیر ضروري معلوماتو ورکولو څخه ډډه وکړئ. دا ټول بورسونه وړیا دي او هیڅکله پیسې نه غواړي.', en: 'Please avoid providing unnecessary personal info when applying. These scholarships are free and never ask for money.', uz: 'Iltimos, ariza topshirishda keraksiz shaxsiy ma\'lumotlarni taqdim etishdan saqlaning. Ushbu stipendiyalar bepul va hech qachon pul talab qilmaydi.' },
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
