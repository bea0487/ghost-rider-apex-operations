-- Fix client authentication and linking issues
-- Run this in Supabase SQL Editor

-- First, let's create a better trigger that handles email confirmation
CREATE OR REPLACE FUNCTION link_client_on_signup()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
    -- Check if there's a client record waiting for this email
    -- This handles both new signups and email confirmations
    IF TG_OP = 'INSERT' OR (TG_OP = 'UPDATE' AND OLD.email_confirmed_at IS NULL AND NEW.email_confirmed_at IS NOT NULL) THEN
        UPDATE public.clients 
        SET user_id = NEW.id 
        WHERE email = NEW.email AND user_id IS NULL;
    END IF;
    
    RETURN NEW;
END;
$$;

-- Drop existing trigger and recreate
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
DROP TRIGGER IF EXISTS on_auth_user_confirmed ON auth.users;

-- Create triggers for both signup and confirmation
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION link_client_on_signup();

CREATE TRIGGER on_auth_user_confirmed
    AFTER UPDATE ON auth.users
    FOR EACH ROW EXECUTE FUNCTION link_client_on_signup();

-- Function to manually link existing users (for troubleshooting)
CREATE OR REPLACE FUNCTION manual_link_client(user_email TEXT)
RETURNS JSON
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    user_record RECORD;
    result JSON;
BEGIN
    -- Get the user record
    SELECT id, email INTO user_record FROM auth.users WHERE email = user_email;
    
    IF NOT FOUND THEN
        result := json_build_object('success', false, 'message', 'User not found');
        RETURN result;
    END IF;
    
    -- Link the client record
    UPDATE public.clients 
    SET user_id = user_record.id 
    WHERE email = user_email AND user_id IS NULL;
    
    IF FOUND THEN
        result := json_build_object('success', true, 'message', 'Client linked successfully');
    ELSE
        result := json_build_object('success', false, 'message', 'No unlinked client record found');
    END IF;
    
    RETURN result;
END;
$$;

-- Grant permissions
GRANT EXECUTE ON FUNCTION manual_link_client TO authenticated;

-- Test the manual linking function (replace with actual email)
-- SELECT manual_link_client('testclient@example.com');