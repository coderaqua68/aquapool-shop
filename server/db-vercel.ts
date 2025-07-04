import { neon } from '@neondatabase/serverless';

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL must be set');
}

export const sql = neon(process.env.DATABASE_URL);

// Simple database operations for Vercel deployment
export const db = {
  async query(text: string, params?: any[]) {
    return sql(text, params);
  }
};