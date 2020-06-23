
--**** Uncomment and run below 2 statements to create database and schema for the first time ****

--create database gcc_isolation_tracker;

--create schema gcc_isolation_tracker_dev;

	
	SET search_path TO gcc_isolation_tracker_dev;	

	CREATE TABLE city
	(
	    id SERIAL NOT NULL,
	    name character varying(255) COLLATE pg_catalog."default" NOT NULL,
	    CONSTRAINT city_pkey PRIMARY KEY (id)
	);
	
	CREATE TABLE zone
		(
		    id SERIAL NOT NULL,
		    name character varying(128) NOT NULL,
		    city integer NOT NULL,
		    CONSTRAINT zones_pkey PRIMARY KEY (id),
		    CONSTRAINT city_fk FOREIGN KEY (city)
		        REFERENCES city (id) MATCH SIMPLE
		        ON UPDATE NO ACTION
		        ON DELETE NO ACTION
		        NOT VALID
		);
		
		CREATE TABLE ward
		(
		    id SERIAL NOT NULL,
		    zone integer,
		    CONSTRAINT zone_fk FOREIGN KEY (zone)
		        REFERENCES zone (id) MATCH SIMPLE
		        ON UPDATE NO ACTION
		        ON DELETE NO ACTION
		        NOT VALID
		);
		
			CREATE TABLE quarantine_type
	(
	    id SERIAL NOT NULL,
	    name character varying(256) COLLATE pg_catalog."default" NOT NULL,
	    code character varying(64) COLLATE pg_catalog."default",
	    CONSTRAINT quarantine_type_pkey PRIMARY KEY (id)
	);
	
	CREATE TABLE quarantine_sub_type
	(
	    id SERIAL NOT NULL,
	    name character varying(256) COLLATE pg_catalog."default" NOT NULL,
	    code character varying(64) COLLATE pg_catalog."default",
	    quarantine_type integer NOT NULL,
	    CONSTRAINT quarantine_sub_type_pkey PRIMARY KEY (id),
	    CONSTRAINT quarantine_sub_type_quarantine_type_fkey FOREIGN KEY (quarantine_type)
	        REFERENCES quarantine_type (id) MATCH SIMPLE
	        ON UPDATE NO ACTION
	        ON DELETE NO ACTION
	        NOT VALID
	);
	
		CREATE TABLE address
	(
	    id SERIAL NOT NULL,
	    door_num character varying(64) COLLATE pg_catalog."default",
	    building_name character varying(512) COLLATE pg_catalog."default",
	    house_num_old character varying(16) COLLATE pg_catalog."default",
	    house_num_new character varying(16) COLLATE pg_catalog."default",
	    street character varying(512) COLLATE pg_catalog."default" NOT NULL,
	    area character varying(512) COLLATE pg_catalog."default" NOT NULL,
	    locality character varying(512) COLLATE pg_catalog."default" NOT NULL,
	    zone integer NOT NULL,
	    division character varying(256) COLLATE pg_catalog."default" NOT NULL,
	    CONSTRAINT address_pkey PRIMARY KEY (id),
	    CONSTRAINT zone_fk FOREIGN KEY (zone)
	        REFERENCES zone (id) MATCH SIMPLE
	        ON UPDATE NO ACTION
	        ON DELETE NO ACTION
	        NOT VALID
	);

	
	CREATE TABLE users
		(
		    id SERIAL NOT NULL,
		    name character varying(255) COLLATE pg_catalog."default" NOT NULL,
		    login character varying(10) COLLATE pg_catalog."default" NOT NULL,
		    password character varying(10) COLLATE pg_catalog."default" NOT NULL,
		    active boolean NOT NULL DEFAULT true,
		    last_login date,
		    CONSTRAINT users_pk PRIMARY KEY (id)
		);

	create unique index users_login_uindex on users (login);

	CREATE TABLE person
	(
	    id BIGSERIAL NOT NULL,
	    name character varying(512) COLLATE pg_catalog."default" NOT NULL,
	    age integer NOT NULL,
	    phone_number character varying(13) COLLATE pg_catalog."default" NOT NULL,
	    family_member_total integer,
	    gender character varying(64) COLLATE pg_catalog."default" NOT NULL,
	    address integer,
	    created_by integer,
	    isolation_start_date date,
	    quarantine_type integer,
	    quarantine_sub_type integer,
	    created_at timestamp without time zone,
	    updated_at timestamp without time zone,
	    CONSTRAINT quarantiner_pkey PRIMARY KEY (id),
	    CONSTRAINT address_fk FOREIGN KEY (address)
	        REFERENCES address (id) MATCH SIMPLE
	        ON UPDATE NO ACTION
	        ON DELETE NO ACTION
	        NOT VALID,
	    CONSTRAINT person_quarantine_sub_type_fkey FOREIGN KEY (quarantine_sub_type)
	        REFERENCES quarantine_sub_type (id) MATCH SIMPLE
	        ON UPDATE NO ACTION
	        ON DELETE NO ACTION,
	    CONSTRAINT person_quarantine_type_fkey FOREIGN KEY (quarantine_type)
	        REFERENCES quarantine_type (id) MATCH SIMPLE
	        ON UPDATE NO ACTION
	        ON DELETE NO ACTION,
	    CONSTRAINT user_fk FOREIGN KEY (created_by)
	        REFERENCES users (id) MATCH SIMPLE
	        ON UPDATE NO ACTION
	        ON DELETE NO ACTION
	        NOT VALID
	);
	
	CREATE TABLE person_user_cross_ref
	(
	    id BIGSERIAL NOT NULL,
	    person integer NOT NULL,
	    gcc_user integer NOT NULL,
	    curr_ind boolean DEFAULT true,
	    created_at timestamp without time zone,
	    updated_at timestamp without time zone,
	    CONSTRAINT person_user_cross_ref_pkey PRIMARY KEY (id),
	    CONSTRAINT person_user_cross_ref_person_fkey FOREIGN KEY (person)
	        REFERENCES person (id) MATCH SIMPLE
	        ON UPDATE NO ACTION
	        ON DELETE NO ACTION
	        NOT VALID,
	    CONSTRAINT person_user_cross_ref_user_fkey FOREIGN KEY (gcc_user)
	        REFERENCES users (id) MATCH SIMPLE
	        ON UPDATE NO ACTION
	        ON DELETE NO ACTION
	);
	
	CREATE TABLE person_isolation_details
	(
	    id BIGSERIAL NOT NULL,
	    person integer NOT NULL,
	    is_present_at_home boolean NOT NULL,
	    is_family_members_at_home boolean NOT NULL,
	    basic_necessities character varying(512) COLLATE pg_catalog."default",
	    is_self_or_family_with_symptoms boolean NOT NULL,
	    additional_comments character varying(2048) COLLATE pg_catalog."default",
	    status_check_date date NOT NULL,
	    created_by integer NOT NULL,
	    updated_by integer,
	    location_lat double precision,
	    location_long double precision,
		created_at timestamp without time zone,
    	updated_at timestamp without time zone,
    	disabled boolean,
    	is_offline_enquiry boolean,
    	day smallint,
	    CONSTRAINT person_isolation_details_pkey PRIMARY KEY (id),
	    CONSTRAINT person_isolation_details_created_by_fkey FOREIGN KEY (created_by)
	        REFERENCES users (id) MATCH SIMPLE
	        ON UPDATE NO ACTION
	        ON DELETE NO ACTION,
	    CONSTRAINT person_isolation_details_person_fkey FOREIGN KEY (person)
	        REFERENCES person (id) MATCH SIMPLE
	        ON UPDATE NO ACTION
	        ON DELETE NO ACTION,
	    CONSTRAINT person_isolation_details_updated_by_fkey FOREIGN KEY (updated_by)
	        REFERENCES users (id) MATCH SIMPLE
	        ON UPDATE NO ACTION
	        ON DELETE NO ACTION
	);
	
	INSERT INTO users(name, login, password, active, last_login) VALUES ('Satya', '8438150484', '8438150484', true, null);
	INSERT INTO users(name, login, password, active, last_login) VALUES ('Muthu', '8056111540', '8056111540', true, null);
	INSERT INTO users(name, login, password, active, last_login) VALUES ('Nandha', '9942316140', '9942316140', true, null);

	INSERT INTO city(name) VALUES('Chennai');

	INSERT INTO zone VALUES(1, 'Thiruvottiyur', 1);
	INSERT INTO zone VALUES(2, 'Manali', 1);
	INSERT INTO zone VALUES(3, 'Madhavaram', 1);
	INSERT INTO zone VALUES(4, 'Tondiarpet', 1);
	INSERT INTO zone VALUES(5, 'Royapuram', 1);
	INSERT INTO zone VALUES(6, 'Thiru. Vi. Ka. Nagar', 1);
	INSERT INTO zone VALUES(7, 'Ambattur', 1);
	INSERT INTO zone VALUES(8, 'Anna Nagar', 1);
	INSERT INTO zone VALUES(9, 'Teynampet', 1);
	INSERT INTO zone VALUES(10, 'Kodambakkam', 1);
	INSERT INTO zone VALUES(11, 'Valasaravakkam', 1);
	INSERT INTO zone VALUES(12, 'Alandur', 1);
	INSERT INTO zone VALUES(13, 'Adyar', 1);
	INSERT INTO zone VALUES(14, 'Perungudi', 1);
	INSERT INTO zone VALUES(15, 'Sholinganallur', 1);
	
	INSERT INTO quarantine_type(name) values('Home Isolation');
	INSERT INTO quarantine_type(name) values('Cured and Discharged');
	INSERT INTO quarantine_type(name) values('Personal Contacts');
	INSERT INTO quarantine_type(name) values('Tested and Waiting for results');
	INSERT INTO quarantine_type(name) values('Travel Quarantine');
	INSERT INTO quarantine_type(name) values('Fever Clinics');
	INSERT INTO quarantine_type(name) values('Others');

	INSERT INTO quarantine_sub_type(name, quarantine_type) SELECT 'Govt Hospital',id from quarantine_type where name = 'Cured and Discharged';
	INSERT INTO quarantine_sub_type(name, quarantine_type) SELECT 'COVID Care Center',id from quarantine_type where name = 'Cured and Discharged';
	INSERT INTO quarantine_sub_type(name, quarantine_type) SELECT 'PVT. Hospital',id from quarantine_type where name = 'Cured and Discharged';
	INSERT INTO quarantine_sub_type(name, quarantine_type) SELECT 'Home Contacts',id from quarantine_type where name = 'Personal Contacts';
	INSERT INTO quarantine_sub_type(name, quarantine_type) SELECT 'Extended Contacts',id from quarantine_type where name = 'Personal Contacts';
	INSERT INTO quarantine_sub_type(name, quarantine_type) SELECT 'GCC Lab',id from quarantine_type where name = 'Tested and Waiting for results';
	INSERT INTO quarantine_sub_type(name, quarantine_type) SELECT 'Govt. Lab',id from quarantine_type where name = 'Tested and Waiting for results';
	INSERT INTO quarantine_sub_type(name, quarantine_type) SELECT 'Pvt. Lab',id from quarantine_type where name = 'Tested and Waiting for results';

	INSERT INTO quarantine_sub_type(name, quarantine_type) SELECT 'International Flight',id from quarantine_type where name = 'Travel Quarantine';
	INSERT INTO quarantine_sub_type(name, quarantine_type) SELECT 'Domestic Flight State',id from quarantine_type where name = 'Travel Quarantine';
	INSERT INTO quarantine_sub_type(name, quarantine_type) SELECT 'Domestic Flight District',id from quarantine_type where name = 'Travel Quarantine';
	INSERT INTO quarantine_sub_type(name, quarantine_type) SELECT 'Sea Port',id from quarantine_type where name = 'Travel Quarantine';
	INSERT INTO quarantine_sub_type(name, quarantine_type) SELECT 'Inter State Train',id from quarantine_type where name = 'Travel Quarantine';
	INSERT INTO quarantine_sub_type(name, quarantine_type) SELECT 'Inter State Road',id from quarantine_type where name = 'Travel Quarantine';
	INSERT INTO quarantine_sub_type(name, quarantine_type) SELECT 'Inter District Road',id from quarantine_type where name = 'Travel Quarantine';
	
