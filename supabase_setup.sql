-- Create tables
CREATE TABLE IF NOT EXISTS books (
  id TEXT PRIMARY KEY,
  title TEXT,
  grade TEXT,
  subject TEXT,
  category TEXT
);

CREATE TABLE IF NOT EXISTS scholarships (
  id TEXT PRIMARY KEY,
  name TEXT,
  gender TEXT,
  levels TEXT[],
  format TEXT,
  coverage TEXT,
  isVerified BOOLEAN,
  targetAudience TEXT,
  description TEXT,
  link TEXT
);

CREATE TABLE IF NOT EXISTS volunteer_sessions (
  id TEXT PRIMARY KEY,
  subject TEXT,
  tutor TEXT,
  platform TEXT,
  schedule TEXT
);

-- Allow public read access (assuming you want anon users to read)
ALTER TABLE books ENABLE ROW LEVEL SECURITY;
ALTER TABLE scholarships ENABLE ROW LEVEL SECURITY;
ALTER TABLE volunteer_sessions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read-only access for books" ON books FOR SELECT USING (true);
CREATE POLICY "Allow public read-only access for scholarships" ON scholarships FOR SELECT USING (true);
CREATE POLICY "Allow public read-only access for volunteer_sessions" ON volunteer_sessions FOR SELECT USING (true);

-- Insert mockBooks
INSERT INTO books (id, title, grade, subject, category) VALUES
  ('1', 'تعلیمات اسلامی', 'صنف ۱۲', 'اسلامیات', 'لیسه'),
  ('2', 'جعفری', 'صنف ۱۲', 'اسلامیات', 'لیسه'),
  ('3', 'ریاضی', 'صنف ۱۲', 'ریاضی', 'لیسه'),
  ('4', 'كمپيوتر', 'صنف ۱۲', 'ساینس', 'لیسه'),
  ('5', 'بیالوژی', 'صنف ۱۲', 'ساینس', 'لیسه'),
  ('6', 'پشتو', 'صنف ۱۲', 'زبان', 'لیسه'),
  ('7', 'جغرافیه', 'صنف ۱۲', 'اجتماعیات', 'لیسه'),
  ('8', 'تاریخ', 'صنف ۱۲', 'اجتماعیات', 'لیسه'),
  ('9', 'فزیک', 'صنف ۱۲', 'ساینس', 'لیسه'),
  ('10', 'کیمیا', 'صنف ۱۲', 'ساینس', 'لیسه'),
  ('11', 'م.مدنی', 'صنف ۱۲', 'اجتماعیات', 'لیسه'),
  ('12', 'انګلیسي', 'صنف ۱۲', 'زبان', 'لیسه'),
  ('13', 'دری', 'صنف ۱۲', 'زبان', 'لیسه'),
  ('14', 'تفسیر شریف', 'صنف ۱۲', 'اسلامیات', 'لیسه'),
  ('15', 'فزیک', 'صنف ۱۱', 'ساینس', 'لیسه'),
  ('16', 'کیمیا', 'صنف ۱۰', 'ساینس', 'لیسه'),
  ('17', 'تاریخ', 'صنف ۹', 'اجتماعیات', 'متوسطه')
ON CONFLICT (id) DO NOTHING;

-- Insert mockScholarships
INSERT INTO scholarships (id, name, gender, levels, format, coverage, isVerified, targetAudience, description, link) VALUES
  ('s1', 'UWC High School Scholarship 2026 Entry', 'همه', ARRAY['مکتب'], 'حضوری', 'کاملاً رایگان', true, 'Boys & Girls (Ages 15-18)', 'Fully Funded On-Campus (International)', 'https://apply.uwc.org/'),
  ('s2', 'Global Korea Scholarship (GKS) for Afghan Students', 'همه', ARRAY['لیسانس', 'ماستری'], 'حضوری', 'کاملاً رایگان', true, 'Boys & Girls', 'Fully Funded (Tuition, Stipend, Flights, Language Year) in South Korea.', 'https://www.studyinkorea.go.kr/'),
  ('s3', 'Japanese Government (MEXT) Research & Graduate Scholarship', 'همه', ARRAY['ماستری'], 'حضوری', 'کاملاً رایگان', true, 'Boys & Girls', 'Fully Funded On-Campus (Japan).', 'https://www.afg.emb-japan.go.jp/'),
  ('s4', 'Türkiye Bursları Government Scholarships', 'همه', ARRAY['لیسانس', 'ماستری'], 'حضوری', 'کاملاً رایگان', true, 'Under 21 for Bachelor''s, Under 30 for Master''s', 'Fully Funded (Tuition, Dormitory, Health Insurance, Monthly Stipend) in Turkey.', 'https://www.turkiyeburslari.gov.tr/'),
  ('s5', 'SBW Berlin Scholarship for Refugees & International Students', 'همه', ARRAY['لیسانس', 'ماستری'], 'حضوری', 'کاملاً رایگان', true, 'Boys & Girls (Ages 18-30)', 'Fully Funded (Tuition, Free Shared Flat Accommodation, Monthly Stipend) in Germany.', 'https://sbw.berlin/en/'),
  ('s6', 'UK Chevening Master''s Scholarship', 'همه', ARRAY['ماستری'], 'حضوری', 'کاملاً رایگان', true, 'All Graduates (Minimum 2 years work/volunteer experience)', 'Fully Funded On-Campus (United Kingdom).', 'https://www.chevening.org/'),
  ('s7', 'Bard College Berlin PIESC Scholarship', 'همه', ARRAY['لیسانس'], 'حضوری', 'کاملاً رایگان', true, 'Boys & Girls from Conflict-Affected Areas', 'Fully Funded On-Campus (Germany).', 'https://berlin.bard.edu/'),
  ('s8', 'University of the People Online Degree Program', 'همه', ARRAY['لیسانس'], 'آنلاین', 'کاملاً رایگان', true, 'All Afghan Students (Girls & Boys)', 'Tuition-Free (Computer Science, Business, Health Science) 100% Online.', 'https://www.uopeople.edu/'),
  ('s9', 'Helmut Veith Stipend for Women in Computer Science', 'دخترانه', ARRAY['ماستری'], 'حضوری', 'کاملاً رایگان', true, 'Female Students Only', 'Fully Funded (EUR 7,000/year + Tuition Waiver) On-Campus (Austria / TU Wien).', 'https://www.tuwien.at/'),
  ('s10', 'Stipendium Hungaricum Hungarian Government Scholarship', 'همه', ARRAY['لیسانس', 'ماستری'], 'حضوری', 'کاملاً رایگان', true, 'Boys & Girls', 'Fully Funded (Tuition, Monthly Allowance, Housing Contribution) On-Campus (Hungary / Europe).', 'https://stipendiumhungaricum.hu/'),
  ('s11', 'Islamic Development Bank (IsDB) Scholarship Program', 'همه', ARRAY['لیسانس', 'ماستری'], 'حضوری', 'کاملاً رایگان', true, 'Boys & Girls', 'Fully Funded On-Campus (Global Member Institutions).', 'https://www.isdb.org/scholarships'),
  ('s12', 'Erasmus Mundus Joint Master Degrees (EMJMD)', 'همه', ARRAY['ماستری'], 'حضوری', 'کاملاً رایگان', true, 'All Graduates', 'Fully Funded (Travel, Visa, Monthly Allowance) On-Campus (Multiple European Universities).', 'https://erasmus-plus.ec.europa.eu/'),
  ('s13', 'AAUW International Fellowships for Women', 'دخترانه', ARRAY['ماستری'], 'حضوری', 'کاملاً رایگان', true, 'Female Students Only', 'Fully Funded ($20,000–$50,000 stipend) On-Campus (USA).', 'https://www.aauw.org/'),
  ('s14', 'ICCR Scholarships for Afghanistan (Online & Distance)', 'همه', ARRAY['لیسانس', 'ماستری'], 'آنلاین', 'کاملاً رایگان', true, 'Boys & Girls', 'Fully Funded E-Learning Degrees.', 'https://www.iccr.gov.in/'),
  ('s15', 'Right To Learn (CW4WAfghan) Secondary Courses', 'دخترانه', ARRAY['مکتب'], 'آنلاین', 'کاملاً رایگان', true, 'Girls & Women', '100% Free 100% Online Secondary Courses.', 'https://www.cw4wafghan.ca/'),
  ('s16', 'Flex / YES High School Exchange Program', 'همه', ARRAY['مکتب'], 'حضوری', 'کاملاً رایگان', true, 'Boys & Girls (Ages 15-17)', 'Fully Funded (1 Academic Year in US High School).', 'https://www.yesprograms.org/')
ON CONFLICT (id) DO NOTHING;

-- Insert mockVolunteers
INSERT INTO volunteer_sessions (id, subject, tutor, platform, schedule) VALUES
  ('v1', 'آمادگی تافل (TOEFL Prep)', 'استاد احمدی', 'Google Meet', 'روزهای طاق، ساعت ۴ بعد از ظهر'),
  ('v2', 'برنامه‌نویسی وب (پایتون/ری‌اکت)', 'انجنیر نوری', 'Telegram Group', 'پنج‌شنبه‌ها، ساعت ۸ شب'),
  ('v3', 'ریاضیات عالی (آمادگی کانکور)', 'استاد رحیمی', 'Zoom', 'روزهای جفت، ساعت ۵ عصر')
ON CONFLICT (id) DO NOTHING;

