import fs from 'fs';
const file = 'src/components/Scholarships.tsx';
let content = fs.readFileSync(file, 'utf8');

const regex = /const \{ data, error \} = await supabase\.from\('scholarships'\)\.select\('\*'\);\s+if \(error\) \{\s+console\.error\("Error fetching scholarships: ", error\);\s+\} else \{\s+setScholarships\(data as Scholarship\[\]\);\s+\}/;

const replacement = `const { data, error } = await supabase.from('scholarships').select('*');
        if (error || !data || data.length === 0) {
          console.warn("Falling back to mock scholarships data.");
          setScholarships(mockScholarships);
        } else {
          setScholarships(data as Scholarship[]);
        }`;

if (content.match(regex)) {
  content = content.replace(regex, replacement);
  // Also need to make sure mockScholarships is imported
  if (!content.includes('mockScholarships')) {
    content = content.replace(`import { supabase } from '../lib/supabase';`, `import { supabase } from '../lib/supabase';\nimport { mockScholarships } from '../data';`);
  }
  fs.writeFileSync(file, content);
  console.log('updated Scholarships');
} else {
  console.log('Target not found for Scholarships fallback regex');
}
