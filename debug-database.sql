-- Debug script to check what tables exist and their structure
-- Run this in Supabase SQL Editor to see what's actually in the database

-- Check if tables exist
SELECT table_name, table_schema 
FROM information_schema.tables 
WHERE table_schema = 'public' 
AND table_name IN ('support_tickets', 'csa_scores', 'ifta_records', 'dataq_disputes', 'driver_files', 'eld_reports')
ORDER BY table_name;

-- Check support_tickets table structure
SELECT column_name, data_type, is_nullable, column_default
FROM information_schema.columns 
WHERE table_name = 'support_tickets' AND table_schema = 'public'
ORDER BY ordinal_position;

-- Check if there are any support tickets
SELECT COUNT(*) as support_ticket_count FROM public.support_tickets;

-- Check if there are any clients
SELECT id, email, company_name, tier FROM public.clients LIMIT 5;

-- Check RLS policies on support_tickets
SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual 
FROM pg_policies 
WHERE tablename = 'support_tickets';

-- Check current user and role
SELECT 
  auth.uid() as current_user_id,
  auth.jwt() -> 'app_metadata' ->> 'role' as current_role;