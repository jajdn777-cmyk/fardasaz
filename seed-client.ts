import { initializeApp } from 'firebase/app';
import { getFirestore, doc, setDoc } from 'firebase/firestore';
import { readFileSync } from 'fs';
import path from 'path';

// Import data from your data.ts file (we will duplicate the static data here to avoid TS module resolution issues)
const mockBooks = [
  { id: '1', title: 'تعلیمات اسلامی', grade: 'صنف ۱۲', subject: 'اسلامیات', category: 'لیسه' },
  { id: '2', title: 'جعفری', grade: 'صنف ۱۲', subject: 'اسلامیات', category: 'لیسه' },
  { id: '3', title: 'ریاضی', grade: 'صنف ۱۲', subject: 'ریاضی', category: 'لیسه' },
  { id: '4', title: 'كمپيوتر', grade: 'صنف ۱۲', subject: 'ساینس', category: 'لیسه' },
  { id: '5', title: 'بیالوژی', grade: 'صنف ۱۲', subject: 'ساینس', category: 'لیسه' },
  { id: '6', title: 'پشتو', grade: 'صنف ۱۲', subject: 'زبان', category: 'لیسه' },
  { id: '7', title: 'جغرافیه', grade: 'صنف ۱۲', subject: 'اجتماعیات', category: 'لیسه' },
  { id: '8', title: 'تاریخ', grade: 'صنف ۱۲', subject: 'اجتماعیات', category: 'لیسه' },
  { id: '9', title: 'فزیک', grade: 'صنف ۱۲', subject: 'ساینس', category: 'لیسه' },
  { id: '10', title: 'کیمیا', grade: 'صنف ۱۲', subject: 'ساینس', category: 'لیسه' },
  { id: '11', title: 'م.مدنی', grade: 'صنف ۱۲', subject: 'اجتماعیات', category: 'لیسه' },
  { id: '12', title: 'انګلیسي', grade: 'صنف ۱۲', subject: 'زبان', category: 'لیسه' },
  { id: '13', title: 'دری', grade: 'صنف ۱۲', subject: 'زبان', category: 'لیسه' },
  { id: '14', title: 'تفسیر شریف', grade: 'صنف ۱۲', subject: 'اسلامیات', category: 'لیسه' },
  { id: '15', title: 'فزیک', grade: 'صنف ۱۱', subject: 'ساینس', category: 'لیسه' },
  { id: '16', title: 'کیمیا', grade: 'صنف ۱۰', subject: 'ساینس', category: 'لیسه' },
  { id: '17', title: 'تاریخ', grade: 'صنف ۹', subject: 'اجتماعیات', category: 'متوسطه' },
];

const mockScholarships = [
  {
    id: '1',
    name: 'بورسیه فولبرایت ۲۰۲۵',
    description: 'بورسیه کامل تحصیلی برای مقطع ماستری در ایالات متحده آمریکا با پوشش کامل هزینه‌ها.',
    levels: ['ماستری'],
    gender: 'همه',
    coverage: 'کامل',
    format: 'حضوری',
    targetAudience: 'فارغان پوهنتون',
    link: '#',
    deadline: '۲۰ سنبله ۱۴۰۳'
  },
  {
    id: '2',
    name: 'بورسیه داد (DAAD) آلمان',
    description: 'برنامه بورسیه تحصیلی آلمان برای دانشجویان کشورهای در حال توسعه در رشته‌های مهندسی و علوم.',
    levels: ['ماستری', 'دکترا'],
    gender: 'همه',
    coverage: 'تکمیلی',
    format: 'حضوری',
    targetAudience: 'متخصصین',
    link: '#',
    deadline: '۱۵ میزان ۱۴۰۳'
  },
  {
    id: '3',
    name: 'بورسیه آنلاین دانشگاه مردم (UoPeople)',
    description: 'تحصیلات عالی کاملاً رایگان و آنلاین در رشته‌های کمپیوتر ساینس، اداره تجارت و صحت عامه.',
    levels: ['لیسانس', 'ماستری'],
    gender: 'همه',
    coverage: 'کامل',
    format: 'آنلاین',
    targetAudience: 'فارغان مکتب',
    link: '#',
    deadline: 'پذیرش همیشه باز'
  },
  {
    id: '4',
    name: 'بورسیه اختصاصی زنان (Asian University)',
    description: 'بورسیه تحصیلی ویژه زنان و دختران افغان در دانشگاه آسیایی بنگلادش.',
    levels: ['لیسانس'],
    gender: 'فقط دختران',
    coverage: 'کامل',
    format: 'حضوری',
    targetAudience: 'فارغان مکتب',
    link: '#',
    deadline: '۳۰ عقرب ۱۴۰۳'
  }
];

const mockVolunteerSessions = [
  {
    id: '1',
    instructorName: 'انجنیر محمدی',
    subject: 'ریاضیات و هندسه',
    grade: 'صنف ۱۰ تا ۱۲',
    time: 'شنبه‌ها و دوشنبه‌ها، ساعت ۴ عصر',
    platform: 'Google Meet'
  },
  {
    id: '2',
    instructorName: 'داکتر رحمانی',
    subject: 'بیالوژی و کیمیا',
    grade: 'صنف ۱۱ و ۱۲',
    time: 'یکشنبه‌ها و سه‌شنبه‌ها، ساعت ۵ عصر',
    platform: 'Zoom'
  },
  {
    id: '3',
    instructorName: 'استاد کریمی',
    subject: 'انگلیسی (آمادگی تافل)',
    grade: 'سطح پیشرفته',
    time: 'پنجشنبه‌ها، ساعت ۶ شام',
    platform: 'Google Meet'
  },
  {
    id: '4',
    instructorName: 'استاد نیازی',
    subject: 'آمادگی کانکور (عمومی)',
    grade: 'فارغان مکتب',
    time: 'جمعه‌ها، ساعت ۹ صبح',
    platform: 'Telegram Live'
  }
];

async function seed() {
  const configRaw = readFileSync(path.join(process.cwd(), 'firebase-applet-config.json'), 'utf-8');
  const config = JSON.parse(configRaw);

  const app = initializeApp({
    projectId: config.projectId,
    appId: config.appId,
    apiKey: config.apiKey,
    authDomain: config.authDomain,
  });

  const db = getFirestore(app, config.firestoreDatabaseId);

  console.log('Seeding books...');
  for (const book of mockBooks) {
    await setDoc(doc(db, 'books', book.id), book);
  }

  console.log('Seeding scholarships...');
  for (const item of mockScholarships) {
    await setDoc(doc(db, 'scholarships', item.id), item);
  }

  console.log('Seeding volunteer sessions...');
  for (const item of mockVolunteerSessions) {
    await setDoc(doc(db, 'volunteer_sessions', item.id), item);
  }

  console.log('Done seeding data!');
  process.exit(0);
}

seed().catch(console.error);
