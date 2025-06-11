
-- Create a table to store form submissions
CREATE TABLE public.form_submissions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT,
  phone TEXT NOT NULL,
  city TEXT,
  budget TEXT,
  property_type TEXT,
  visit_date DATE,
  message TEXT,
  project TEXT DEFAULT 'Lodha Villa Imperio',
  source TEXT DEFAULT 'Website Lead Form',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.form_submissions ENABLE ROW LEVEL SECURITY;

-- Create a policy that allows anyone to insert form submissions (public form)
CREATE POLICY "Anyone can submit forms" 
  ON public.form_submissions 
  FOR INSERT 
  TO anon, authenticated
  WITH CHECK (true);

-- Create a policy that allows authenticated users to view all submissions (for staff dashboard)
CREATE POLICY "Authenticated users can view all submissions" 
  ON public.form_submissions 
  FOR SELECT 
  TO authenticated
  USING (true);
