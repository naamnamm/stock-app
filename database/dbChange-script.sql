DO
$do$
BEGIN
	RAISE NOTICE 'BEGIN: Change data type id column from cash_transfer';
	IF EXISTS (SELECT * FROM information_schema.columns WHERE table_name = 'cash_transfer' AND column_name = 'id') 
	THEN	   
		RAISE NOTICE '\tColumn "id" - Changing data type';
		ALTER TABLE cash_transfer ALTER COLUMN id DROP DEFAULT, 
    ALTER COLUMN id SET DATA TYPE UUID USING (uuid_generate_v4()), 
    ALTER COLUMN id SET DEFAULT uuid_generate_v4();
	ELSE
		RAISE NOTICE '\tColumn "id" does not exist.  No action was necessary.';
	END IF;	

END
$do$