import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = supabaseUrl && supabaseAnonKey
  ? createClient(supabaseUrl, supabaseAnonKey)
  : {
      from: (table: string) => ({
        select: async () => {
          console.warn(`Supabase credentials missing. Returning mock data for table: ${table}`);
          if (table === 'books') {
            const { mockBooks } = await import('../data');
            return { data: mockBooks, error: null };
          }
          if (table === 'scholarships') {
            const { mockScholarships } = await import('../data');
            return { data: mockScholarships, error: null };
          }
          if (table === 'volunteer_sessions') {
            const { mockVolunteers } = await import('../data');
            return { data: mockVolunteers, error: null };
          }
          return { data: [], error: null };
        }
      })
    } as any;
