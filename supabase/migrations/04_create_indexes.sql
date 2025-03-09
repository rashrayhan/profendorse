-- Create indexes for better query performance
create index idx_users_email on users(email);
create index idx_users_role on users(role);
create index idx_reference_requests_status on reference_requests(status);
create index idx_payments_status on payments(status);
create index idx_messages_receiver on messages(receiver_id, is_read);
create index idx_notifications_user on notifications(user_id, is_read); 