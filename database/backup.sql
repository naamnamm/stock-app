--
-- PostgreSQL database dump
--

-- Dumped from database version 13.0
-- Dumped by pg_dump version 13.0

-- Started on 2021-10-07 10:28:41

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 2 (class 3079 OID 24577)
-- Name: uuid-ossp; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA public;


--
-- TOC entry 3052 (class 0 OID 0)
-- Dependencies: 2
-- Name: EXTENSION "uuid-ossp"; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION "uuid-ossp" IS 'generate universally unique identifiers (UUIDs)';


--
-- TOC entry 218 (class 1255 OID 24627)
-- Name: generate_uid(integer); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.generate_uid(size integer) RETURNS text
    LANGUAGE plpgsql
    AS $$
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
$$;


ALTER FUNCTION public.generate_uid(size integer) OWNER TO postgres;

--
-- TOC entry 217 (class 1255 OID 24588)
-- Name: generate_uuid(integer); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.generate_uuid(size integer) RETURNS text
    LANGUAGE plpgsql
    AS $$
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
$$;


ALTER FUNCTION public.generate_uuid(size integer) OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 206 (class 1259 OID 32906)
-- Name: cash_balances; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.cash_balances (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    amount numeric(8,2) NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    user_id uuid
);


ALTER TABLE public.cash_balances OWNER TO postgres;

--
-- TOC entry 202 (class 1259 OID 24658)
-- Name: cash_transfer; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.cash_transfer (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    type text NOT NULL,
    amount numeric(8,2) NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    user_id uuid
);


ALTER TABLE public.cash_transfer OWNER TO postgres;

--
-- TOC entry 205 (class 1259 OID 24713)
-- Name: currentholdings; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.currentholdings (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    symbol text NOT NULL,
    quantity numeric(8,2) NOT NULL,
    purchaseprice numeric(8,2) NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    user_id uuid
);


ALTER TABLE public.currentholdings OWNER TO postgres;

--
-- TOC entry 204 (class 1259 OID 24698)
-- Name: orders; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.orders (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    symbol text NOT NULL,
    type text NOT NULL,
    quantity numeric(8,2) NOT NULL,
    price numeric(8,2) NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    user_id uuid
);


ALTER TABLE public.orders OWNER TO postgres;

--
-- TOC entry 201 (class 1259 OID 24602)
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    name character varying(255) NOT NULL,
    password character varying(255) NOT NULL,
    last_active_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.users OWNER TO postgres;

--
-- TOC entry 203 (class 1259 OID 24683)
-- Name: watchlists; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.watchlists (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    symbol text NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    user_id uuid
);


ALTER TABLE public.watchlists OWNER TO postgres;

--
-- TOC entry 2910 (class 2606 OID 32912)
-- Name: cash_balances cash_balances_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cash_balances
    ADD CONSTRAINT cash_balances_pkey PRIMARY KEY (id);


--
-- TOC entry 2901 (class 2606 OID 24674)
-- Name: cash_transfer cash_transfer_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cash_transfer
    ADD CONSTRAINT cash_transfer_pkey PRIMARY KEY (id);


--
-- TOC entry 2907 (class 2606 OID 24722)
-- Name: currentholdings currentholdings_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.currentholdings
    ADD CONSTRAINT currentholdings_pkey PRIMARY KEY (id);


--
-- TOC entry 2905 (class 2606 OID 24707)
-- Name: orders orders_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT orders_pkey PRIMARY KEY (id);


--
-- TOC entry 2899 (class 2606 OID 24611)
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- TOC entry 2903 (class 2606 OID 24692)
-- Name: watchlists watchlists_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.watchlists
    ADD CONSTRAINT watchlists_pkey PRIMARY KEY (id);


--
-- TOC entry 2911 (class 1259 OID 41098)
-- Name: cash_balances_user_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX cash_balances_user_id ON public.cash_balances USING btree (user_id);


--
-- TOC entry 2908 (class 1259 OID 32890)
-- Name: currentholdings_user_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX currentholdings_user_id ON public.currentholdings USING btree (user_id, symbol);


--
-- TOC entry 2916 (class 2606 OID 32913)
-- Name: cash_balances cash_balances_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cash_balances
    ADD CONSTRAINT cash_balances_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- TOC entry 2912 (class 2606 OID 24668)
-- Name: cash_transfer cash_transfer_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cash_transfer
    ADD CONSTRAINT cash_transfer_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- TOC entry 2915 (class 2606 OID 24723)
-- Name: currentholdings currentholdings_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.currentholdings
    ADD CONSTRAINT currentholdings_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- TOC entry 2914 (class 2606 OID 24708)
-- Name: orders orders_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT orders_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- TOC entry 2913 (class 2606 OID 24693)
-- Name: watchlists watchlists_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.watchlists
    ADD CONSTRAINT watchlists_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id);


-- Completed on 2021-10-07 10:28:41

--
-- PostgreSQL database dump complete
--

