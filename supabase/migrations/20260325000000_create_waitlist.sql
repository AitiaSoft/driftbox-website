-- Create waitlist table for driftbox-website signups
CREATE TABLE IF NOT EXISTS waitlist (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  email text NOT NULL UNIQUE,
  source text DEFAULT 'website',
  tier text,
  utm_source text,
  utm_medium text,
  utm_campaign text,
  utm_content text,
  utm_term text,
  referrer text,
  signed_up_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE waitlist ENABLE ROW LEVEL SECURITY;

-- Allow service role full access (API route uses service role key)
CREATE POLICY "Allow service role full access" ON waitlist
  FOR ALL USING (true) WITH CHECK (true);
