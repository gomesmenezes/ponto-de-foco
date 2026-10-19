-- Modelo inicial da semana 1. Não é executado nem conectado ao protótipo.
-- Destino: PostgreSQL com PostGIS. Aplicar somente em banco de desenvolvimento vazio.
-- Autenticação e autorização por agente/microárea deverão anteceder qualquer uso real.
BEGIN;
CREATE EXTENSION IF NOT EXISTS postgis;
CREATE SCHEMA ponto_de_foco;
REVOKE ALL ON SCHEMA ponto_de_foco FROM PUBLIC;

CREATE TABLE ponto_de_foco.agents (
  id uuid PRIMARY KEY,
  auth_subject text UNIQUE NOT NULL,
  display_name text NOT NULL CHECK (length(trim(display_name)) > 0),
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE ponto_de_foco.microareas (
  id uuid PRIMARY KEY,
  code text UNIQUE NOT NULL,
  name text NOT NULL,
  city text NOT NULL DEFAULT 'Campina Grande',
  center geography(Point, 4326)
);

CREATE TABLE ponto_de_foco.properties (
  id uuid PRIMARY KEY,
  microarea_id uuid NOT NULL REFERENCES ponto_de_foco.microareas(id),
  block_code text NOT NULL CHECK (length(trim(block_code)) > 0),
  property_code text NOT NULL CHECK (length(trim(property_code)) > 0),
  location geography(Point, 4326),
  UNIQUE (microarea_id, block_code, property_code)
);

CREATE TABLE ponto_de_foco.visits (
  -- UUID gerado no cliente permite registro off-line e futura idempotência de envio.
  id uuid PRIMARY KEY,
  agent_id uuid NOT NULL REFERENCES ponto_de_foco.agents(id),
  property_id uuid NOT NULL REFERENCES ponto_de_foco.properties(id),
  result text NOT NULL CHECK (result IN ('inspecionado', 'fechado', 'recusado')),
  notes text NOT NULL DEFAULT '' CHECK (length(notes) <= 500),
  device_recorded_at timestamptz NOT NULL,
  received_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE ponto_de_foco.visit_findings (
  id uuid PRIMARY KEY,
  visit_id uuid NOT NULL REFERENCES ponto_de_foco.visits(id),
  container_type text NOT NULL,
  quantity smallint NOT NULL CHECK (quantity BETWEEN 1 AND 99)
);

CREATE INDEX properties_microarea_idx ON ponto_de_foco.properties(microarea_id);
CREATE INDEX properties_location_idx ON ponto_de_foco.properties USING gist(location);
CREATE INDEX microareas_center_idx ON ponto_de_foco.microareas USING gist(center);
CREATE INDEX visits_agent_idx ON ponto_de_foco.visits(agent_id);
CREATE INDEX visits_property_date_idx ON ponto_de_foco.visits(property_id, device_recorded_at DESC);
CREATE INDEX visits_date_idx ON ponto_de_foco.visits(device_recorded_at DESC);
CREATE INDEX visit_findings_visit_idx ON ponto_de_foco.visit_findings(visit_id);
REVOKE ALL ON ALL TABLES IN SCHEMA ponto_de_foco FROM PUBLIC;
COMMIT;
