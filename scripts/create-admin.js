const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

const createAdmin = async () => {
  try {
    // 1. Sign up the admin user
    const { data: authData, error: signUpError } = await supabase.auth.signUp({
      email: 'admin@profendorse.com',
      password: 'Admin123!@#',
      options: {
        data: {
          first_name: 'Admin',
          last_name: 'User',
          role: 'admin',
        },
      },
    });

    if (signUpError) {
      throw signUpError;
    }

    console.log('Admin user created in auth system:', authData);

    // 2. Insert into public users table
    const { data: userData, error: userError } = await supabase
      .from('users')
      .insert([
        {
          id: authData.user?.id,
          email: 'admin@profendorse.com',
          role: 'admin',
          first_name: 'Admin',
          last_name: 'User',
          verification_status: 'verified',
          is_active: true,
        },
      ])
      .select()
      .single();

    if (userError) {
      throw userError;
    }

    console.log('Admin user created in users table:', userData);
    console.log('\nAdmin user created successfully!');
    console.log('Email: admin@profendorse.com');
    console.log('Password: Admin123!@#');

  } catch (error) {
    console.error('Error creating admin user:', error);
  } finally {
    process.exit();
  }
};

// Run the function
createAdmin(); 