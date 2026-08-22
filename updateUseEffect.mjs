import fs from 'fs';

function addAbortController(file, targetRegex, replacement) {
  let content = fs.readFileSync(file, 'utf8');
  if (content.match(targetRegex)) {
    content = content.replace(targetRegex, replacement);
    fs.writeFileSync(file, content);
    console.log(`Updated ${file}`);
  } else {
    console.log(`Target not found in ${file}`);
  }
}

const booksRegex = /useEffect\(\(\) => \{\s+async function fetchBooks\(\) \{\s+try \{\s+const \{ data, error \} = await supabase\.from\('books'\)\.select\('\*'\);\s+if \(error \|\| !data \|\| data\.length === 0\) \{\s+console\.warn\("Falling back to mock books data\."\);\s+setBooks\(mockBooks\);\s+\} else \{\s+setBooks\(data as Book\[\]\);\s+\}\s+\} catch \(error\) \{\s+console\.error\("Error fetching books: ", error\);\s+setBooks\(mockBooks\);\s+\} finally \{\s+setLoading\(false\);\s+\}\s+\}\s+fetchBooks\(\);\s+\}, \[\]\);/;

const booksReplacement = `useEffect(() => {
    let isMounted = true;
    async function fetchBooks() {
      try {
        const { data, error } = await supabase.from('books').select('*');
        if (!isMounted) return;
        if (error || !data || data.length === 0) {
          console.warn("Falling back to mock books data.");
          setBooks(mockBooks);
        } else {
          setBooks(data as Book[]);
        }
      } catch (error) {
        if (!isMounted) return;
        console.error("Error fetching books: ", error);
        setBooks(mockBooks);
      } finally {
        if (isMounted) setLoading(false);
      }
    }
    fetchBooks();
    return () => { isMounted = false; };
  }, []);`;

addAbortController('src/components/BooksHub.tsx', booksRegex, booksReplacement);

// Scholarships
const scholRegex = /useEffect\(\(\) => \{\s+async function fetchScholarships\(\) \{\s+try \{\s+const \{ data, error \} = await supabase\.from\('scholarships'\)\.select\('\*'\);\s+if \(error \|\| !data \|\| data\.length === 0\) \{\s+console\.warn\("Falling back to mock scholarships data\."\);\s+setScholarships\(mockScholarships\);\s+\} else \{\s+setScholarships\(data as Scholarship\[\]\);\s+\}\s+\} catch \(error\) \{\s+console\.error\("Error fetching scholarships: ", error\);\s+\} finally \{\s+setLoading\(false\);\s+\}\s+\}\s+fetchScholarships\(\);\s+\}, \[\]\);/;

const scholReplacement = `useEffect(() => {
    let isMounted = true;
    async function fetchScholarships() {
      try {
        const { data, error } = await supabase.from('scholarships').select('*');
        if (!isMounted) return;
        if (error || !data || data.length === 0) {
          console.warn("Falling back to mock scholarships data.");
          setScholarships(mockScholarships);
        } else {
          setScholarships(data as Scholarship[]);
        }
      } catch (error) {
        if (!isMounted) return;
        console.error("Error fetching scholarships: ", error);
      } finally {
        if (isMounted) setLoading(false);
      }
    }
    fetchScholarships();
    return () => { isMounted = false; };
  }, []);`;

addAbortController('src/components/Scholarships.tsx', scholRegex, scholReplacement);

// Volunteers
const volRegex = /useEffect\(\(\) => \{\s+async function fetchVolunteers\(\) \{\s+try \{\s+const \{ data, error \} = await supabase\.from\('volunteer_sessions'\)\.select\('\*'\);\s+if \(error \|\| !data \|\| data\.length === 0\) \{\s+console\.warn\("Falling back to mock volunteer data\."\);\s+setVolunteers\(mockVolunteers\);\s+\} else \{\s+setVolunteers\(data as any\[\]\);\s+\}\s+\} catch \(error\) \{\s+console\.error\("Error fetching volunteers: ", error\);\s+\} finally \{\s+setLoading\(false\);\s+\}\s+\}\s+fetchVolunteers\(\);\s+\}, \[\]\);/;

const volReplacement = `useEffect(() => {
    let isMounted = true;
    async function fetchVolunteers() {
      try {
        const { data, error } = await supabase.from('volunteer_sessions').select('*');
        if (!isMounted) return;
        if (error || !data || data.length === 0) {
          console.warn("Falling back to mock volunteer data.");
          setVolunteers(mockVolunteers);
        } else {
          setVolunteers(data as any[]);
        }
      } catch (error) {
        if (!isMounted) return;
        console.error("Error fetching volunteers: ", error);
      } finally {
        if (isMounted) setLoading(false);
      }
    }
    fetchVolunteers();
    return () => { isMounted = false; };
  }, []);`;

addAbortController('src/components/Volunteer.tsx', volRegex, volReplacement);

