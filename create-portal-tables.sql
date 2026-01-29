-- Create additional tables for portal functionality
-- Run this in Supabase SQL Editor

-- CSA Scores Table
CREATE TABLE IF NOT EXISTS public.csa_scores (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  client_id UUID REFERENCES public.clients(id) ON DELETE CASCADE NOT NULL,
  score_date DATE NOT NULL,
  unsafe_driving INTEGER DEFAULT 0,
  fatigued_driving INTEGER DEFAULT 0,
  driver_fitness INTEGER DEFAULT 0,
  vehicle_maintenance INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- IFTA Records Table
CREATE TABLE IF NOT EXISTS public.ifta_records (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  client_id UUID REFERENCES public.clients(id) ON DELETE CASCADE NOT NULL,
  date DATE NOT NULL,
  state VARCHAR(2) NOT NULL,
  miles DECIMAL(10,2) NOT NULL,
  gallons DECIMAL(10,2) NOT NULL,
  fuel_cost DECIMAL(10,2) NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- DataQ Disputes Table
CREATE TABLE IF NOT EXISTS public.dataq_disputes (
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

-- Driver Files Table
CREATE TABLE IF NOT EXISTS public.driver_files (
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

-- Enable RLS on all tables
ALTER TABLE public.csa_scores ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ifta_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.dataq_disputes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.driver_files ENABLE ROW LEVEL SECURITY;

-- RLS Policies for CSA Scores
CREATE POLICY "Clients can view their own CSA scores"
  ON public.csa_scores FOR SELECT
  USING (client_id IN (SELECT id FROM public.clients WHERE user_id = auth.uid()));

CREATE POLICY "Admins can do everything on csa_scores"
  ON public.csa_scores FOR ALL
  USING (auth.jwt() -> 'app_metadata' ->> 'role' = 'admin')
  WITH CHECK (auth.jwt() -> 'app_metadata' ->> 'role' = 'admin');

-- RLS Policies for IFTA Records
CREATE POLICY "Clients can manage their own IFTA records"
  ON public.ifta_records FOR ALL
  USING (client_id IN (SELECT id FROM public.clients WHERE user_id = auth.uid()));

CREATE POLICY "Admins can do everything on ifta_records"
  ON public.ifta_records FOR ALL
  USING (auth.jwt() -> 'app_metadata' ->> 'role' = 'admin')
  WITH CHECK (auth.jwt() -> 'app_metadata' ->> 'role' = 'admin');

-- RLS Policies for DataQ Disputes
CREATE POLICY "Clients can manage their own DataQ disputes"
  ON public.dataq_disputes FOR ALL
  USING (client_id IN (SELECT id FROM public.clients WHERE user_id = auth.uid()));

CREATE POLICY "Admins can do everything on dataq_disputes"
  ON public.dataq_disputes FOR ALL
  USING (auth.jwt() -> 'app_metadata' ->> 'role' = 'admin')
  WITH CHECK (auth.jwt() -> 'app_metadata' ->> 'role' = 'admin');

-- RLS Policies for Driver Files
CREATE POLICY "Clients can manage their own driver files"
  ON public.driver_files FOR ALL
  USING (client_id IN (SELECT id FROM public.clients WHERE user_id = auth.uid()));

CREATE POLICY "Admins can do everything on driver_files"
  ON public.driver_files FOR ALL
  USING (auth.jwt() -> 'app_metadata' ->> 'role' = 'admin')
  WITH CHECK (auth.jwt() -> 'app_metadata' ->> 'role' = 'admin');

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_csa_scores_client_date ON public.csa_scores(client_id, score_date DESC);
CREATE INDEX IF NOT EXISTS idx_ifta_records_client_date ON public.ifta_records(client_id, date DESC);
CREATE INDEX IF NOT EXISTS idx_dataq_disputes_client_status ON public.dataq_disputes(client_id, status);
CREATE INDEX IF NOT EXISTS idx_driver_files_client_name ON public.driver_files(client_id, driver_name);

-- Add triggers for updated_at timestamps
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_dataq_disputes_updated_at BEFORE UPDATE ON public.dataq_disputes
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_driver_files_updated_at BEFORE UPDATE ON public.driver_files
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();