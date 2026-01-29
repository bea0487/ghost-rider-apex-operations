-- Update ELD Reports table to match the component expectations
-- Run this in Supabase SQL Editor

-- Add missing columns to eld_reports table
ALTER TABLE public.eld_reports 
ADD COLUMN IF NOT EXISTS report_date DATE,
ADD COLUMN IF NOT EXISTS period_start DATE,
ADD COLUMN IF NOT EXISTS period_end DATE,
ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'pending',
ADD COLUMN IF NOT EXISTS summary TEXT;

-- Update existing records to have proper dates if they don't exist
UPDATE public.eld_reports 
SET 
  report_date = week_start,
  period_start = week_start,
  period_end = week_start + INTERVAL '6 days'
WHERE report_date IS NULL;

-- Create index for better performance
CREATE INDEX IF NOT EXISTS idx_eld_reports_client_date ON public.eld_reports(client_id, report_date DESC);
CREATE INDEX IF NOT EXISTS idx_eld_reports_status ON public.eld_reports(status);

-- Add some sample data for testing (optional - remove if not needed)
-- INSERT INTO public.eld_reports (client_id, report_date, period_start, period_end, status, summary, violations)
-- SELECT 
--   c.id,
--   CURRENT_DATE - INTERVAL '7 days',
--   CURRENT_DATE - INTERVAL '13 days',
--   CURRENT_DATE - INTERVAL '7 days',
--   'compliant',
--   'Weekly ELD compliance report - all drivers compliant',
--   0
-- FROM public.clients c
-- WHERE NOT EXISTS (
--   SELECT 1 FROM public.eld_reports e WHERE e.client_id = c.id
-- );