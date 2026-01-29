-- Manual Client Creation (Run this in Supabase SQL Editor)
-- Replace the values below with your test client info

-- First, create a user in auth.users (this simulates signup)
INSERT INTO auth.users (
  instance_id,
  id,
  aud,
  role,
  email,
  encrypted_password,
  email_confirmed_at,
  created_at,
  updated_at,
  confirmation_token,
  email_change,
  email_change_token_new,
  recovery_token
) VALUES (
  '00000000-0000-0000-0000-000000000000',
  gen_random_uuid(),
  'authenticated',
  'authenticated',
  'testclient@example.com',  -- Change this email
  crypt('password123', gen_salt('bf')),  -- Change this password
  NOW(),
  NOW(),
  NOW(),
  '',
  '',
  '',
  ''
);

-- Then create the client record
INSERT INTO public.clients (user_id, email, company_name, client_id, tier)
VALUES (
  (SELECT id FROM auth.users WHERE email = 'testclient@example.com'),
  'testclient@example.com',  -- Same email as above
  'Test Trucking Company',   -- Change company name
  'DOT123456',              -- Change client ID
  'wingman'                 -- Change tier if needed
);

-- Verify it worked
SELECT 'Client created successfully!' as status;
SELECT c.*, u.email as auth_email 
FROM public.clients c 
JOIN auth.users u ON c.user_id = u.id 
WHERE c.email = 'testclient@example.com';