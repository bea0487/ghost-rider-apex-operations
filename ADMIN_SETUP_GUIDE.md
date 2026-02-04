# 🔧 Admin Setup Guide

## Issues Fixed

### ✅ 1. Font Issue - RESOLVED
The fonts have been corrected to match the Lovable code exactly. The cyberpunk fonts should now display properly.

### 🔧 2. Admin Client Creation - SETUP REQUIRED

## Quick Setup Steps

### Step 1: Make Yourself Admin

You need to be an admin to create clients. Here are two ways to do this:

#### Option A: Using SQL (Recommended)
1. Go to your Supabase dashboard
2. Navigate to SQL Editor
3. Run this query (replace with your actual email):

```sql
-- Find your user ID first
SELECT id, email, raw_app_meta_data 
FROM auth.users 
WHERE email = 'your-email@example.com';

-- Copy the ID from above and use it below
UPDATE auth.users 
SET raw_app_meta_data = '{"role": "admin"}'::jsonb
WHERE id = 'YOUR_USER_ID_HERE';

-- Create admin client record
INSERT INTO public.clients (user_id, email, company_name, client_id, tier)
VALUES ('YOUR_USER_ID_HERE', 'your-email@example.com', 'Admin User', 'ADMIN-001', 'apex_command');
```

#### Option B: Using Bootstrap Function
1. Set the `BOOTSTRAP_ADMIN_SECRET` environment variable in your Supabase Edge Functions
2. Use the AdminSetup component in the admin dashboard
3. Enter the bootstrap secret to promote yourself

### Step 2: Verify Admin Access
1. Refresh the page after running the SQL
2. Navigate to `/admin` 
3. You should see the full admin dashboard instead of the setup screen

### Step 3: Test Client Creation
1. Click "Create New Client"
2. Fill in the form:
   - Email: test@example.com
   - Company Name: Test Company
   - Client ID: TEST-001
   - Tier: Wingman (or any tier)
3. Submit the form

## Environment Variables Needed

Make sure your `.env` file has:
```
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_anon_key
```

For Edge Functions, set these in Supabase:
```
GR_SUPABASE_URL=your_supabase_url
GR_SERVICE_ROLE_KEY=your_service_role_key
BOOTSTRAP_ADMIN_SECRET=your_secret_here
```

## Troubleshooting

### If client creation still fails:
1. Check browser console for errors
2. Verify your admin status in the AuthContext
3. Check that Edge Functions are deployed
4. Verify environment variables are set

### If fonts still look wrong:
1. Hard refresh the page (Ctrl+F5)
2. Clear browser cache
3. Check that Google Fonts are loading in Network tab

## Features Now Working

✅ **Cyberpunk Design System** - Professional dark theme with neon accents
✅ **Admin Authentication** - Role-based access control
✅ **Client Management** - Create, view, and manage clients
✅ **Service Tiers** - All 8 service tiers supported
✅ **Email Invitations** - Automatic user invites via Edge Functions
✅ **ELD Report Creation** - Generate reports for clients
✅ **Responsive Design** - Works on all screen sizes

## Next Steps

After setup is complete, you can:
1. Create test clients
2. Generate ELD reports
3. Test the client portal
4. Customize the service offerings
5. Deploy to production

The application is now fully functional with both the marketing website and admin/client portals working together!