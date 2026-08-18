CREATE TABLE public.system_initialization (
  id boolean PRIMARY KEY DEFAULT true,
  is_initialized boolean NOT NULL DEFAULT false,
  initialized_at timestamp with time zone,
  version text NOT NULL DEFAULT '',
  metadata jsonb NOT NULL DEFAULT '{}',
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

GRANT SELECT ON public.system_initialization TO anon;
GRANT SELECT ON public.system_initialization TO authenticated;
GRANT ALL ON public.system_initialization TO service_role;

ALTER TABLE public.system_initialization ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read initialization status"
  ON public.system_initialization
  FOR SELECT
  USING (true);

CREATE POLICY "Service role can manage initialization"
  ON public.system_initialization
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

CREATE OR REPLACE FUNCTION public.set_system_initialization_updated_at()
RETURNS trigger
LANGUAGE plpgsql
SET search_path = 'public'
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

CREATE TRIGGER system_initialization_updated_at
  BEFORE UPDATE ON public.system_initialization
  FOR EACH ROW
  EXECUTE FUNCTION public.set_system_initialization_updated_at();