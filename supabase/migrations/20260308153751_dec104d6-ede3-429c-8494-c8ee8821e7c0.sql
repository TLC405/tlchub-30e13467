
-- Create table for saved gym/fitness locations
CREATE TABLE public.gyms (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  address TEXT,
  city TEXT NOT NULL DEFAULT 'Oklahoma City',
  state TEXT NOT NULL DEFAULT 'OK',
  latitude DOUBLE PRECISION,
  longitude DOUBLE PRECISION,
  rating NUMERIC(2,1),
  phone TEXT,
  website TEXT,
  description TEXT,
  source_url TEXT,
  tags TEXT[] DEFAULT '{}',
  hours JSONB,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.gyms ENABLE ROW LEVEL SECURITY;

-- Public read access (everyone can browse gyms)
CREATE POLICY "Gyms are viewable by everyone" ON public.gyms FOR SELECT USING (true);

-- Create index for category filtering
CREATE INDEX idx_gyms_category ON public.gyms(category);
CREATE INDEX idx_gyms_city ON public.gyms(city);

-- Create update timestamp trigger
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_gyms_updated_at
  BEFORE UPDATE ON public.gyms
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
