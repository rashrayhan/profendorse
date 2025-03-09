-- Insert admin user
INSERT INTO auth.users (
    instance_id,
    id,
    aud,
    role,
    email,
    encrypted_password,
    email_confirmed_at,
    created_at,
    updated_at,
    confirmation_token,
    email_change,
    email_change_token_new,
    recovery_token
) VALUES (
    '00000000-0000-0000-0000-000000000000',
    'ad9514a4-a42c-4e4a-8f35-35a61a2d3c4c',
    'authenticated',
    'authenticated',
    'admin@profendorse.com',
    crypt('Admin123!@#', gen_salt('bf')),
    now(),
    now(),
    now(),
    '',
    '',
    '',
    ''
);

-- Insert admin metadata
INSERT INTO auth.users (
    id,
    raw_app_meta_data,
    raw_user_meta_data,
    is_super_admin,
    created_at,
    updated_at
) VALUES (
    'ad9514a4-a42c-4e4a-8f35-35a61a2d3c4c',
    '{"provider":"email","providers":["email"],"role":"admin"}',
    '{"first_name":"Admin","last_name":"User"}',
    true,
    now(),
    now()
);

-- Insert into our users table
INSERT INTO public.users (
    id,
    email,
    role,
    first_name,
    last_name,
    verification_status,
    is_active
) VALUES (
    'ad9514a4-a42c-4e4a-8f35-35a61a2d3c4c',
    'admin@profendorse.com',
    'admin',
    'Admin',
    'User',
    'verified',
    true
); 