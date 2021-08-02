CREATE DATABASE CS_Tracker;

USE CS_Tracker;

CREATE TABLE Users(
	ID int,
	name varchar(255),
	email varchar(255),
	password varchar(255),
	pfp varchar(255),
	school varchar(255),
	hours_needed int,
	done_hours int,
	admin bool,
	student_id int
);

Create Table loghours (
  ID int,
  date timestamp,
  name varchar(255),
  location varchar(255),
  contact varchar(255),
  description text,
  start_time timestamp,
  end_time timestamp,
  total_hours float,
  approved bool,
  student_id int
  );

  -- brandon table name centers with columns name, location, phone, contact_person, approved
  
  DROP DATABASE CS_Tracker;