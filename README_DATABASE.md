# Database Structure Documentation

## Overview
This project now uses a separated database structure with two main tables:
1. `users` - For user authentication data only
2. `reports` - For astrological analysis reports

## Table Structures

### Users Table
Stores user authentication data only.

```sql
CREATE TABLE users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  is_active BOOLEAN DEFAULT true,
  email_verified BOOLEAN DEFAULT false,
  verification_token TEXT,
  reset_token TEXT,
  reset_token_expires TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### Reports Table
Stores astrological analysis reports linked to users.

```sql
CREATE TABLE reports (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  birth_date DATE NOT NULL,
  birth_time TIME NOT NULL,
  birth_place TEXT NOT NULL,
  face_image_path TEXT,
  hand_image_path TEXT,
  analysis_result JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

## Migration Process

The database has been migrated from a single `users` table containing both authentication and analysis data to separated tables.

### Migration Files
1. `001_create_users_table.sql` - Original table creation
2. `002_add_auth_fields_to_users_table.sql` - Added authentication fields
3. `003_recreate_users_table_with_auth.sql` - Recreated users table with auth fields
4. `004_separate_users_and_reports_tables.sql` - Separated users and reports tables

### Applying the Migration
1. Execute the `004_separate_users_and_reports_tables.sql` script in your Supabase SQL Editor
2. This will drop the existing tables and create the new separated structure

## API Changes

### Authentication
- Authentication routes remain the same but now work with the separated users table
- User registration and login functions updated to use new table structure

### Analysis
- Analysis endpoint (`/api/analyze`) now requires authentication
- Analysis results are stored in the `reports` table with a reference to the user
- Report retrieval (`/api/report/:id`) now requires authentication and checks user ownership

### Profile
- Profile endpoint (`/api/profile`) shows user authentication data and lists their reports
- Reports are retrieved from the separate `reports` table

## Benefits of Separation
1. **Security**: Authentication data is isolated from analysis data
2. **Scalability**: Reports can be managed independently
3. **Maintainability**: Clear separation of concerns
4. **Performance**: More efficient queries on smaller, focused tables
5. **Data Integrity**: Proper referential integrity between users and their reports