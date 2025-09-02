<<<<<<< HEAD
# Supabase Setup Instructions

This project uses Supabase as its database backend. Follow these steps to set up Supabase for your project:

## 1. Create a Supabase Account

1. Go to [https://supabase.com](https://supabase.com)
2. Sign up for a free account or sign in if you already have one
3. Create a new project

## 2. Get Your Supabase Credentials

After creating your project, you'll need to get your project URL and API key:

1. In your Supabase dashboard, select your project
2. Go to "Project Settings" → "API"
3. Copy your "Project URL" and "anon" public key

## 3. Update Environment Variables

Update your `.env` file with your Supabase credentials:

```
SUPABASE_URL=your_supabase_project_url_here
SUPABASE_KEY=your_supabase_anon_key_here
```

## 4. Create the Database Table

You have two options to create the users table:

### Option A: Using the Supabase SQL Editor

1. In your Supabase dashboard, go to "SQL Editor"
2. Create a new query
3. Copy and paste the contents of `supabase/migrations/001_create_users_table.sql`
4. Run the query

### Option B: Using Supabase CLI (if installed)

1. Install the Supabase CLI if you haven't already
2. Link your project:
   ```bash
   supabase link --project-ref your-project-ref
   ```
3. Apply the migration:
   ```bash
   supabase migration up
   ```

## 5. Test the Connection

Start your server to test the connection:

```bash
node server.js
```

If everything is set up correctly, you should see no database connection errors.

## 6. Additional Configuration (Optional)

### Enable Row Level Security (RLS)

If you want to add security policies to your table, you can add RLS policies in the Supabase dashboard or via SQL:

```sql
-- Example: Allow users to read their own data
create policy "Users can read their own data" 
on users for select 
using (auth.uid() = user_id);

-- Example: Allow users to insert their own data
create policy "Users can insert their own data" 
on users for insert 
with check (auth.uid() = user_id);
```

Note: For this to work, you'll need to integrate Supabase Auth into your application.

## Troubleshooting

### Common Issues

1. **Connection errors**: Make sure your Supabase URL and key are correct
2. **Permission errors**: Check that your Supabase project region matches the URL
3. **Table not found**: Ensure you've run the migration script

### Getting Help

- Check the [Supabase Documentation](https://supabase.com/docs)
- Visit the [Supabase GitHub Repository](https://github.com/supabase/supabase)
=======
# Supabase Setup Instructions

This project uses Supabase as its database backend. Follow these steps to set up Supabase for your project:

## 1. Create a Supabase Account

1. Go to [https://supabase.com](https://supabase.com)
2. Sign up for a free account or sign in if you already have one
3. Create a new project

## 2. Get Your Supabase Credentials

After creating your project, you'll need to get your project URL and API key:

1. In your Supabase dashboard, select your project
2. Go to "Project Settings" → "API"
3. Copy your "Project URL" and "anon" public key

## 3. Update Environment Variables

Update your `.env` file with your Supabase credentials:

```
SUPABASE_URL=your_supabase_project_url_here
SUPABASE_KEY=your_supabase_anon_key_here
```

## 4. Create the Database Table

You have two options to create the users table:

### Option A: Using the Supabase SQL Editor

1. In your Supabase dashboard, go to "SQL Editor"
2. Create a new query
3. Copy and paste the contents of `supabase/migrations/001_create_users_table.sql`
4. Run the query

### Option B: Using Supabase CLI (if installed)

1. Install the Supabase CLI if you haven't already
2. Link your project:
   ```bash
   supabase link --project-ref your-project-ref
   ```
3. Apply the migration:
   ```bash
   supabase migration up
   ```

## 5. Test the Connection

Start your server to test the connection:

```bash
node server.js
```

If everything is set up correctly, you should see no database connection errors.

## 6. Additional Configuration (Optional)

### Enable Row Level Security (RLS)

If you want to add security policies to your table, you can add RLS policies in the Supabase dashboard or via SQL:

```sql
-- Example: Allow users to read their own data
create policy "Users can read their own data" 
on users for select 
using (auth.uid() = user_id);

-- Example: Allow users to insert their own data
create policy "Users can insert their own data" 
on users for insert 
with check (auth.uid() = user_id);
```

Note: For this to work, you'll need to integrate Supabase Auth into your application.

## Troubleshooting

### Common Issues

1. **Connection errors**: Make sure your Supabase URL and key are correct
2. **Permission errors**: Check that your Supabase project region matches the URL
3. **Table not found**: Ensure you've run the migration script

### Getting Help

- Check the [Supabase Documentation](https://supabase.com/docs)
- Visit the [Supabase GitHub Repository](https://github.com/supabase/supabase)
>>>>>>> 4939126ee5c953624a0df2c93b0c18153fd12173
- Join the [Supabase Discord Community](https://discord.supabase.com)