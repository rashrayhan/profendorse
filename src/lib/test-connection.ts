import { supabase } from './supabase';

export const testConnection = async () => {
  try {
    const { data, error } = await supabase.from('users').select('count').single();
    if (error) {
      console.error('Connection test error:', error.message);
      return false;
    }
    console.log('Successfully connected to Supabase!');
    return true;
  } catch (error) {
    console.error('Connection test error:', error);
    return false;
  }
}; 