CREATE DATABASE stock_app;

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE users (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  last_active_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE cash_transfer (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  type TEXT NOT NULL,
  amount NUMERIC(8,2) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  user_id uuid REFERENCES users(id)
);

CREATE TABLE watchlists (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  symbol TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  user_id uuid REFERENCES users(id)
);

CREATE TABLE orders (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  symbol TEXT NOT NULL,
  type TEXT NOT NULL,
  quantity NUMERIC(8,2) NOT NULL,
  price NUMERIC(8,2) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  user_id uuid REFERENCES users(id)
);

CREATE TABLE currentHoldings (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  symbol TEXT NOT NULL,
  quantity NUMERIC(8,2) NOT NULL,
  purchasePrice NUMERIC(8,2) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  user_id uuid REFERENCES users(id)
);

CREATE TABLE cash_balances (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  amount NUMERIC(8,2) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  user_id uuid REFERENCES users(id)
);

CREATE UNIQUE INDEX currentHoldings_user_id ON currentHoldings (user_id, symbol);
CREATE UNIQUE INDEX cash_balances_user_id ON cash_balances (user_id);

INSERT INTO users (name, password) VALUES ('ben', '123');
SELECT * FROM users;

