export const supabaseApiKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImthdHVocWtuaWxrZnp1aGljb3hqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDYzNTgwNzEsImV4cCI6MjA2MTkzNDA3MX0.XzrZnQntb1izlifk-Q48PpWDn9YBV9vEvu_m-I2yfLQ';
const supabaseUrl = 'https://katuhqknilkfzuhicoxj.supabase.co';
const authUrl = `${supabaseUrl}/auth/v1`;

export const loginUrl = `${authUrl}/token?grant_type=password`;
export const signupUrl = `${authUrl}/signup`;

export const booksUrl = `${supabaseUrl}/rest/v1/books`;
export const booksListUrl = `${booksUrl}?select=*`;
