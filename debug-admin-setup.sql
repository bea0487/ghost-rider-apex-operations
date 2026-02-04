-- Debug Admin Setup - Run these queries one by one

-- Step 1: Find ALL users in the system
SELECT id, email, raw_app_meta_data, created_at 
FROM auth.users 
ORDER BY created_at DESC;

-- Step 2: Look for your specific email (replace with your actual email)
SELECT id, email, raw_app_meta_data, raw_user_meta_data 
FROM auth.users 
WHERE email = 'britneymstovall@gmail.com';

-- Step 3: If you found your user above, copy the ID and use it here
-- Replace 'YOUR_ACTUAL_USER_ID' with the ID from Step 2
-- UPDATE auth.users 
-- SET raw_app_meta_data = '{"role": "admin"}'::jsonb
-- WHERE id = 'YOUR_ACTUAL_USER_ID';

-- Step 4: Verify the update worked
-- SELECT id, email, raw_app_meta_data 
-- FROM auth.users 
-- WHERE email = 'britneymstovall@gmail.com';

-- Step 5: Create admin client record (replace USER_ID and EMAIL)
-- INSERT INTO public.clients (user_id, email, company_name, client_id, tier)
-- VALUES ('YOUR_ACTUAL_USER_ID', 'britneymstovall@gmail.com', 'Admin User', 'ADMIN-001', 'apex_command')
-- ON CONFLICT (email) DO UPDATE SET
--   user_id = EXCLUDED.user_id,
--   tier = EXCLUDED.tier;

-- Step 6: Verify client record exists
-- SELECT * FROM public.clients WHERE email = 'britneymstovall@gmail.com';