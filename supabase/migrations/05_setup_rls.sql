-- Enable RLS on all tables
alter table users enable row level security;
alter table student_profiles enable row level security;
alter table professor_profiles enable row level security;
alter table documents enable row level security;
alter table reference_templates enable row level security;
alter table reference_requests enable row level security;
alter table request_documents enable row level security;
alter table payments enable row level security;
alter table messages enable row level security;
alter table notifications enable row level security;
alter table withdrawals enable row level security;

-- Users policies
create policy "Users can view their own profile"
    on users for select
    using (auth.uid() = id);

create policy "Users can update their own profile"
    on users for update
    using (auth.uid() = id);

-- Student profiles policies
create policy "Students can view their own profile"
    on student_profiles for select
    using (auth.uid() = id);

create policy "Students can update their own profile"
    on student_profiles for update
    using (auth.uid() = id);

create policy "Professors can view student profiles"
    on student_profiles for select
    using (exists (
        select 1 from users
        where users.id = auth.uid()
        and users.role = 'professor'
    ));

-- Professor profiles policies
create policy "Public can view professor profiles"
    on professor_profiles for select
    to public
    using (true);

create policy "Professors can update their own profile"
    on professor_profiles for update
    using (auth.uid() = id);

-- Documents policies
create policy "Students can view their own documents"
    on documents for select
    using (user_id = auth.uid());

create policy "Students can upload their own documents"
    on documents for insert
    with check (user_id = auth.uid());

create policy "Professors can view related documents"
    on documents for select
    using (exists (
        select 1 from reference_requests
        where reference_requests.professor_id = auth.uid()
        and reference_requests.student_id = documents.user_id
    ));

-- Reference templates policies
create policy "Professors can manage their templates"
    on reference_templates for all
    using (professor_id = auth.uid());

create policy "Students can view professor templates"
    on reference_templates for select
    using (exists (
        select 1 from users
        where users.id = auth.uid()
        and users.role = 'student'
    ));

-- Reference requests policies
create policy "Students can view their own requests"
    on reference_requests for select
    using (student_id = auth.uid());

create policy "Students can create requests"
    on reference_requests for insert
    with check (student_id = auth.uid());

create policy "Professors can view assigned requests"
    on reference_requests for select
    using (professor_id = auth.uid());

create policy "Professors can update assigned requests"
    on reference_requests for update
    using (professor_id = auth.uid());

-- Payments policies
create policy "Users can view their own payments"
    on payments for select
    using (exists (
        select 1 from reference_requests
        where reference_requests.id = payments.request_id
        and (reference_requests.student_id = auth.uid()
             or reference_requests.professor_id = auth.uid())
    ));

-- Messages policies
create policy "Users can view their messages"
    on messages for select
    using (sender_id = auth.uid() or receiver_id = auth.uid());

create policy "Users can send messages"
    on messages for insert
    with check (sender_id = auth.uid());

-- Notifications policies
create policy "Users can view their notifications"
    on notifications for select
    using (user_id = auth.uid());

-- Withdrawals policies
create policy "Professors can view their withdrawals"
    on withdrawals for select
    using (professor_id = auth.uid());

create policy "Professors can request withdrawals"
    on withdrawals for insert
    with check (professor_id = auth.uid());

-- Admin policies for all tables
create policy "Admins have full access to all tables"
    on users for all
    using (
        exists (
            select 1 from users
            where users.id = auth.uid()
            and users.role = 'admin'
        )
    ); 