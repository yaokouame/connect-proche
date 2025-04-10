
-- Create check_tables_exist function
CREATE OR REPLACE FUNCTION public.check_tables_exist()
RETURNS boolean
LANGUAGE plpgsql
AS $$
DECLARE
    professionals_exists boolean;
    pharmacies_exists boolean;
    patients_exists boolean;
    prescriptions_exists boolean;
BEGIN
    -- Check if tables exist
    SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_schema = 'public' 
        AND table_name = 'professionals'
    ) INTO professionals_exists;
    
    SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_schema = 'public' 
        AND table_name = 'pharmacies'
    ) INTO pharmacies_exists;
    
    SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_schema = 'public' 
        AND table_name = 'patients'
    ) INTO patients_exists;
    
    SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_schema = 'public' 
        AND table_name = 'prescriptions'
    ) INTO prescriptions_exists;
    
    -- Return true if all tables exist
    RETURN professionals_exists AND pharmacies_exists AND patients_exists AND prescriptions_exists;
END;
$$;

-- Grant execute to anon and authenticated roles
GRANT EXECUTE ON FUNCTION public.check_tables_exist() TO anon, authenticated;
