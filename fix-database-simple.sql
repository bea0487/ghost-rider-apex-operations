-- Simple database fix script
-- Run this in Supabase SQL Editor

-- First, let's make sure the support_tickets table exists with the right structure
DROP TABLE IF EXISTS public.support_tickets CASCADE;
CREATE TABLE public.support_tickets (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  client_id UUID REFERENCES public.clients(id) ON DELETE CASCADE NOT NULL,
  subject TEXT NOT NULL,
  description TEXT NOT NULL,
  priority TEXT DEFAULT 'medium',
  status TEXT DEFAULT 'open',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.support_tickets ENABLE ROW LEVEL SECURITY;

-- Create simple, working policies
CREATE POLICY "support_tickets_client_policy" ON public.support_tickets
  FOR ALL USING (
    client_id IN (
      SELECT id FROM public.clients WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "support_tickets_admin_policy" ON public.support_tickets
  FOR ALL USING (
    auth.jwt() -> 'app_metadata' ->> 'role' = 'admin'
  );

-- Create other essential tables
DROP TABLE IF EXISTS public.csa_scores CASCADE;
CREATE TABLE public.csa_scores (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  client_id UUID REFERENCES public.clients(id) ON DELETE CASCADE NOT NULL,
  score_date DATE NOT NULL,
  unsafe_driving INTEGER DEFAULT 0,
  fatigued_driving INTEGER DEFAULT 0,
  driver_fitness INTEGER DEFAULT 0,
  vehicle_maintenance INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.csa_scores ENABLE ROW LEVEL SECURITY;
CREATE POLICY "csa_scores_client_policy" ON public.csa_scores
  FOR ALL USING (client_id IN (SELECT id FROM public.clients WHERE user_id = auth.uid()));
CREATE POLICY "csa_scores_admin_policy" ON public.csa_scores
  FOR ALL USING (auth.jwt() -> 'app_metadata' ->> 'role' = 'admin');

-- IFTA Records
DROP TABLE IF EXISTS public.ifta_records CASCADE;
CREATE TABLE public.ifta_records (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  client_id UUID REFERENCES public.clients(id) ON DELETE CASCADE NOT NULL,
  record_date DATE NOT NULL,
  state VARCHAR(2) NOT NULL,
  miles DECIMAL(10,2) NOT NULL,
  gallons DECIMAL(10,2) NOT NULL,
  fuel_cost DECIMAL(10,2) NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.ifta_records ENABLE ROW LEVEL SECURITY;
CREATE POLICY "ifta_records_client_policy" ON public.ifta_records
  FOR ALL USING (client_id IN (SELECT id FROM public.clients WHERE user_id = auth.uid()));
CREATE POLICY "ifta_records_admin_policy" ON public.ifta_records
  FOR ALL USING (auth.jwt() -> 'app_metadata' ->> 'role' = 'admin');

-- DataQ Disputes
DROP TABLE IF EXISTS public.dataq_disputes CASCADE;
CREATE TABLE public.dataq_disputes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  client_id UUID REFERENCES public.clients(id) ON DELETE CASCADE NOT NULL,
  violation_date DATE NOT NULL,
  violation_type VARCHAR(100) NOT NULL,
  description TEXT NOT NULL,
  dispute_reason TEXT NOT NULL,
  status VARCHAR(20) DEFAULT 'pending',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.dataq_disputes ENABLE ROW LEVEL SECURITY;
CREATE POLICY "dataq_disputes_client_policy" ON public.dataq_disputes
  FOR ALL USING (client_id IN (SELECT id FROM public.clients WHERE user_id = auth.uid()));
CREATE POLICY "dataq_disputes_admin_policy" ON public.dataq_disputes
  FOR ALL USING (auth.jwt() -> 'app_metadata' ->> 'role' = 'admin');

-- Driver Files
DROP TABLE IF EXISTS public.driver_files CASCADE;
CREATE TABLE public.driver_files (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  client_id UUID REFERENCES public.clients(id) ON DELETE CASCADE NOT NULL,
  driver_name VARCHAR(100) NOT NULL,
  license_number VARCHAR(50) NOT NULL,
  license_state VARCHAR(2) NOT NULL,
  license_expiry DATE NOT NULL,
  medical_expiry DATE NOT NULL,
  phone_number VARCHAR(20),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.driver_files ENABLE ROW LEVEL SECURITY;
CREATE POLICY "driver_files_client_policy" ON public.driver_files
  FOR ALL USING (client_id IN (SELECT id FROM public.clients WHERE user_id = auth.uid()));
CREATE POLICY "driver_files_admin_policy" ON public.driver_files
  FOR ALL USING (auth.jwt() -> 'app_metadata' ->> 'role' = 'admin');

-- Add some test data for the current client
INSERT INTO public.support_tickets (client_id, subject, description, priority, status)
SELECT c.id, 'Test Ticket', 'This is a test support ticket to verify functionality', 'medium', 'open'
FROM public.clients c
WHERE c.email = 'britneymstovall@gmail.com'  -- Replace with actual client email
LIMIT 1;

-- Add test ELD report
INSERT INTO public.eld_reports (client_id, report_date, period_start, period_end, status, summary, violations)
SELECT c.id, CURRENT_DATE - INTERVAL '7 days', CURRENT_DATE - INTERVAL '13 days', CURRENT_DATE - INTERVAL '7 days', 'compliant', 'Weekly ELD compliance report - all drivers compliant', 0
FROM public.clients c
WHERE c.email = 'britneymstovall@gmail.com'  -- Replace with actual client email
LIMIT 1;

-- Success message
SELECT 'Database tables recreated and test data added successfully!' as result;