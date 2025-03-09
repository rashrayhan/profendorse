-- Enable necessary extensions
create extension if not exists "uuid-ossp";
create extension if not exists "pgcrypto";

-- Enum types
create type user_role as enum ('student', 'professor', 'admin');
create type verification_status as enum ('pending', 'verified', 'rejected');
create type request_status as enum ('pending', 'accepted', 'rejected', 'completed');
create type payment_status as enum ('pending', 'completed', 'failed', 'refunded');
create type payment_method as enum ('card', 'bank_transfer', 'mobile_wallet');

-- Users table (base table for both students and professors)
create table users (
    id uuid primary key default uuid_generate_v4(),
    email text unique not null,
    phone_number text unique,
    password_hash text not null,
    role user_role not null,
    first_name text not null,
    last_name text not null,
    created_at timestamp with time zone default now(),
    updated_at timestamp with time zone default now(),
    last_login timestamp with time zone,
    is_active boolean default true,
    verification_status verification_status default 'pending'
);

-- Students profile
create table student_profiles (
    id uuid primary key references users(id) on delete cascade,
    institution text not null,
    department text not null,
    matriculation_number text,
    graduation_year integer,
    created_at timestamp with time zone default now(),
    updated_at timestamp with time zone default now()
);

-- Professor profiles
create table professor_profiles (
    id uuid primary key references users(id) on delete cascade,
    institution text not null,
    department text not null,
    qualification text[],
    position text not null,
    specialization text[],
    rating decimal(3,2),
    total_references integer default 0,
    created_at timestamp with time zone default now(),
    updated_at timestamp with time zone default now()
);

-- Documents table (for student uploads)
create table documents (
    id uuid primary key default uuid_generate_v4(),
    user_id uuid references users(id) on delete cascade,
    document_type text not null,
    document_url text not null,
    is_verified boolean default false,
    uploaded_at timestamp with time zone default now(),
    verified_at timestamp with time zone,
    verified_by uuid references users(id)
);

-- Reference templates
create table reference_templates (
    id uuid primary key default uuid_generate_v4(),
    professor_id uuid references users(id) on delete cascade,
    template_name text not null,
    content text not null,
    is_default boolean default false,
    created_at timestamp with time zone default now(),
    updated_at timestamp with time zone default now()
);

-- Reference requests
create table reference_requests (
    id uuid primary key default uuid_generate_v4(),
    student_id uuid references users(id) on delete cascade,
    professor_id uuid references users(id),
    template_id uuid references reference_templates(id),
    purpose text not null,
    additional_notes text,
    status request_status default 'pending',
    estimated_completion_date timestamp with time zone,
    completed_at timestamp with time zone,
    created_at timestamp with time zone default now(),
    updated_at timestamp with time zone default now()
);

-- Request documents (linking documents to requests)
create table request_documents (
    request_id uuid references reference_requests(id) on delete cascade,
    document_id uuid references documents(id) on delete cascade,
    primary key (request_id, document_id)
);

-- Payments
create table payments (
    id uuid primary key default uuid_generate_v4(),
    request_id uuid references reference_requests(id) on delete cascade,
    amount decimal(10,2) not null,
    payment_method payment_method not null,
    status payment_status default 'pending',
    transaction_reference text unique,
    professor_share decimal(10,2),
    platform_share decimal(10,2),
    created_at timestamp with time zone default now(),
    updated_at timestamp with time zone default now()
);

-- Messages
create table messages (
    id uuid primary key default uuid_generate_v4(),
    sender_id uuid references users(id) on delete cascade,
    receiver_id uuid references users(id) on delete cascade,
    request_id uuid references reference_requests(id) on delete cascade,
    content text not null,
    is_read boolean default false,
    created_at timestamp with time zone default now()
);

-- Notifications
create table notifications (
    id uuid primary key default uuid_generate_v4(),
    user_id uuid references users(id) on delete cascade,
    title text not null,
    content text not null,
    is_read boolean default false,
    notification_type text not null,
    reference_id uuid,  -- Can reference various entities based on notification_type
    created_at timestamp with time zone default now()
);

-- Professor withdrawals
create table withdrawals (
    id uuid primary key default uuid_generate_v4(),
    professor_id uuid references users(id) on delete cascade,
    amount decimal(10,2) not null,
    status payment_status default 'pending',
    bank_name text not null,
    account_number text not null,
    created_at timestamp with time zone default now(),
    processed_at timestamp with time zone
);

-- Triggers for updated_at timestamps
create or replace function update_updated_at_column()
returns trigger as $$
begin
    new.updated_at = now();
    return new;
end;
$$ language plpgsql;

create trigger update_users_updated_at
    before update on users
    for each row
    execute function update_updated_at_column();

create trigger update_student_profiles_updated_at
    before update on student_profiles
    for each row
    execute function update_updated_at_column();

create trigger update_professor_profiles_updated_at
    before update on professor_profiles
    for each row
    execute function update_updated_at_column();

create trigger update_reference_templates_updated_at
    before update on reference_templates
    for each row
    execute function update_updated_at_column();

create trigger update_reference_requests_updated_at
    before update on reference_requests
    for each row
    execute function update_updated_at_column();

create trigger update_payments_updated_at
    before update on payments
    for each row
    execute function update_updated_at_column();

-- Indexes for better query performance
create index idx_users_email on users(email);
create index idx_users_role on users(role);
create index idx_reference_requests_status on reference_requests(status);
create index idx_payments_status on payments(status);
create index idx_messages_receiver on messages(receiver_id, is_read);
create index idx_notifications_user on notifications(user_id, is_read); 