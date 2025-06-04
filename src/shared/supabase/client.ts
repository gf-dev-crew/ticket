import { createClient } from '@supabase/supabase-js';

// 프로젝트 URL과 anon key를 사용하여 Supabase 클라이언트 생성
const supabaseUrl = 'https://dthuohehckzdxkvjpxlx.supabase.co';
const supabaseKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR0aHVvaGVoY2t6ZHhrdmpweGx4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY3NzMwNjQsImV4cCI6MjA2MjM0OTA2NH0.fyPXgu9ldEL93ddbfOpLXkzJAeRxcLPqbGMI6ZF6_7A';

export const supabase = createClient(supabaseUrl, supabaseKey);
