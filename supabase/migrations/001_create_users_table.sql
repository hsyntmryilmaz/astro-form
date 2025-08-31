-- Create the users table for astrological analysis reports
create table if not exists users (
  id uuid default gen_random_uuid() primary key,
  first_name text not null,
  last_name text not null,
  birth_date date not null,
  birth_time time not null,
  birth_place text not null,
  face_image_path text,
  hand_image_path text,
  analysis_result jsonb,
  created_at timestamp with time zone default now()
);

-- Add indexes for better query performance
create index if not exists idx_users_created_at on users (created_at);
create index if not exists idx_users_last_name on users (last_name);

-- Enable RLS (Row Level Security) if needed
alter table users enable row level security;

-- Add comments for documentation
comment on table users is 'Stores user information and astrological analysis results';
comment on column users.id is 'Unique identifier for the user record';
comment on column users.first_name is 'User''s first name';
comment on column users.last_name is 'User''s last name';
comment on column users.birth_date is 'User''s birth date';
comment on column users.birth_time is 'User''s birth time';
comment on column users.birth_place is 'User''s birth place';
comment on column users.face_image_path is 'Path to the user''s face image';
comment on column users.hand_image_path is 'Path to the user''s hand image';
comment on column users.analysis_result is 'JSON result from the astrological analysis';
comment on column users.created_at is 'Timestamp when the record was created';