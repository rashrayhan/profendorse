-- Create the function for updating timestamps
create or replace function update_updated_at_column()
returns trigger as $$
begin
    new.updated_at = now();
    return new;
end;
$$ language plpgsql;

-- Create triggers for all tables with updated_at column
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