
-- Create tables if they don't exist

-- Professionals table
CREATE TABLE IF NOT EXISTS public.professionals (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    role TEXT DEFAULT 'professional',
    specialty TEXT,
    license TEXT,
    "isOnline" BOOLEAN DEFAULT false,
    location JSONB
);

-- Pharmacies table
CREATE TABLE IF NOT EXISTS public.pharmacies (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    address TEXT NOT NULL,
    phone TEXT,
    hours TEXT,
    "onDuty" BOOLEAN DEFAULT false,
    location JSONB NOT NULL
);

-- Patients table
CREATE TABLE IF NOT EXISTS public.patients (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    role TEXT DEFAULT 'patient',
    location JSONB
);

-- Prescriptions table
CREATE TABLE IF NOT EXISTS public.prescriptions (
    id TEXT PRIMARY KEY,
    "patientId" TEXT NOT NULL REFERENCES public.patients(id),
    "professionalId" TEXT NOT NULL REFERENCES public.professionals(id),
    "professionalName" TEXT NOT NULL,
    date TEXT NOT NULL,
    "expiryDate" TEXT,
    status TEXT CHECK (status IN ('active', 'expired', 'pending')),
    medications JSONB NOT NULL,
    instructions TEXT
);

-- Grant permissions
ALTER TABLE public.professionals ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.pharmacies ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.patients ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.prescriptions ENABLE ROW LEVEL SECURITY;

-- Create policies (allow all operations for now - you may want to restrict these in production)
CREATE POLICY "Allow all operations on professionals" 
ON public.professionals FOR ALL TO authenticated, anon
USING (true) WITH CHECK (true);

CREATE POLICY "Allow all operations on pharmacies" 
ON public.pharmacies FOR ALL TO authenticated, anon
USING (true) WITH CHECK (true);

CREATE POLICY "Allow all operations on patients" 
ON public.patients FOR ALL TO authenticated, anon
USING (true) WITH CHECK (true);

CREATE POLICY "Allow all operations on prescriptions" 
ON public.prescriptions FOR ALL TO authenticated, anon
USING (true) WITH CHECK (true);
