import fs from 'fs';
const file = 'src/components/Volunteer.tsx';
let content = fs.readFileSync(file, 'utf8');

const regex = /const \{ data, error \} = await supabase\.from\('volunteer_sessions'\)\.select\('\*'\);\s+if \(error\) \{\s+console\.error\("Error fetching volunteer sessions: ", error\);\s+\} else \{\s+setVolunteers\(data as any\[\]\);\s+\}/;

const replacement = `const { data, error } = await supabase.from('volunteer_sessions').select('*');
        if (error || !data || data.length === 0) {
          console.warn("Falling back to mock volunteer data.");
          setVolunteers(mockVolunteers);
        } else {
          setVolunteers(data as any[]);
        }`;

if (content.match(regex)) {
  content = content.replace(regex, replacement);
  if (!content.includes('mockVolunteers')) {
    content = content.replace(`import { supabase } from '../lib/supabase';`, `import { supabase } from '../lib/supabase';\nimport { mockVolunteers } from '../data';`);
  }
  fs.writeFileSync(file, content);
  console.log('updated Volunteer');
} else {
  console.log('Target not found for Volunteer fallback regex');
}
