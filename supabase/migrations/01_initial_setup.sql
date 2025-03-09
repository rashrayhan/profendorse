-- Enable necessary extensions
create extension if not exists "uuid-ossp";
create extension if not exists "pgcrypto";

-- Drop existing types if they exist
do $$ 
begin
    if exists (select 1 from pg_type where typname = 'user_role') then
        drop type user_role;
    end if;
    if exists (select 1 from pg_type where typname = 'verification_status') then
        drop type verification_status;
    end if;
    if exists (select 1 from pg_type where typname = 'request_status') then
        drop type request_status;
    end if;
    if exists (select 1 from pg_type where typname = 'payment_status') then
        drop type payment_status;
    end if;
    if exists (select 1 from pg_type where typname = 'payment_method') then
        drop type payment_method;
    end if;
end $$;

-- Create enum types
create type user_role as enum ('student', 'professor', 'admin');
create type verification_status as enum ('pending', 'verified', 'rejected');
create type request_status as enum ('pending', 'accepted', 'rejected', 'completed');
create type payment_status as enum ('pending', 'completed', 'failed', 'refunded');
create type payment_method as enum ('card', 'bank_transfer', 'mobile_wallet');

-- Drop existing tables if they exist
drop table if exists withdrawals;
drop table if exists notifications;
drop table if exists messages;
drop table if exists payments;
drop table if exists request_documents;
drop table if exists reference_requests;
drop table if exists reference_templates;
drop table if exists documents;
drop table if exists professor_profiles;
drop table if exists student_profiles;
drop table if exists users; 