CREATE DATABASE stock_app;

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE OR REPLACE FUNCTION generate_uid(size INT) RETURNS TEXT AS $$
DECLARE
  characters TEXT := 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  bytes BYTEA := gen_random_bytes(size);
  l INT := length(characters);
  i INT := 0;
  output TEXT := '';
BEGIN
  WHILE i < size LOOP
    output := output || substr(characters, get_byte(bytes, i) % l + 1, 1);
    i := i + 1;
  END LOOP;
  RETURN output;
END;
$$ LANGUAGE plpgsql VOLATILE;

CREATE TABLE users (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  last_active_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO users (name, password) VALUES ('ben', '123');
SELECT * FROM users;

CREATE TABLE cash_transfer (
  id TEXT PRIMARY KEY DEFAULT generate_uid(5),
  type TEXT NOT NULL,
  amount NUMERIC(8,2) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  user_id uuid REFERENCES users(id)
);

--\c into the database

--CREATE TABLE 
--https://www.youtube.com/watch?v=_Mun4eOOf2Q