use iclub;
DROP DATABASE IF EXISTS iclub;
CREATE DATABASE iclub;
use iclub;

CREATE TABLE permissions(
	id int NOT NULL AUTO_INCREMENT,
	description varchar(255),
	PRIMARY KEY (id)
);

CREATE TABLE degrees(
	id int NOT NULL AUTO_INCREMENT,
	description varchar(255),
	PRIMARY KEY (id)
);

CREATE TABLE post_type(
	id int NOT NULL AUTO_INCREMENT,
	description varchar(255),
	PRIMARY KEY (id)
);

CREATE TABLE club_type(
	id int NOT NULL AUTO_INCREMENT,
	description varchar(255),
	PRIMARY KEY (id)
);

CREATE TABLE visibility(
	id int NOT NULL AUTO_INCREMENT,
	description varchar(255),
	PRIMARY KEY (id)
);

CREATE TABLE person(
	id int NOT NULL AUTO_INCREMENT,
	permissions int,
	first_name varchar(255),
	last_name varchar(255),
	pass varchar(100),
	email varchar(255) UNIQUE,
	degree int,
	year_level int,
	PRIMARY KEY (id),
	FOREIGN KEY (permissions) REFERENCES permissions(id) ON DELETE SET NULL,
	FOREIGN KEY (degree) REFERENCES degrees(id) ON DELETE SET NULL
);

CREATE TABLE clubs(
	id int NOT NULL AUTO_INCREMENT,
	name varchar(100),
	short_bio varchar(200),
	long_bio varchar(1000),
	club_type_id int,
	image_reference varchar(255),
	image_alt varchar(255),
	PRIMARY KEY (id),
	FOREIGN KEY (club_type_id) REFERENCES club_type(id) ON DELETE SET NULL
);

CREATE TABLE posts(
	id int NOT NULL AUTO_INCREMENT,
	post_type_id int,
	club_id int,
	title varchar(255),
	post_date timestamp,
	content varchar(1000),
	author_id int,
	visibility_id int,
	PRIMARY KEY (id),
	FOREIGN KEY (post_type_id) REFERENCES post_type(id) ON DELETE SET NULL,
	FOREIGN KEY (club_id) REFERENCES clubs(id) ON DELETE SET NULL,
	FOREIGN KEY (author_id) REFERENCES person(id) ON DELETE SET NULL,
	FOREIGN KEY (visibility_id) REFERENCES visibility(id) ON DELETE SET NULL
);

CREATE TABLE persontoclub(
	id int NOT NULL AUTO_INCREMENT,
	person_id int,
	club_id int,
	isManager boolean,
	email_opt_in_events boolean DEFAULT FALSE,
	email_opt_in_updates boolean DEFAULT FALSE,
	PRIMARY KEY (id),
	FOREIGN KEY (person_id) REFERENCES person(id) ON DELETE CASCADE,
	FOREIGN KEY (club_id) REFERENCES clubs(id) ON DELETE CASCADE
);

CREATE TABLE personrsvptoevent(
	id int NOT NULL AUTO_INCREMENT,
	person_id int,
	post_id int,
	PRIMARY KEY (id),
	FOREIGN KEY (person_id) REFERENCES person(id) ON DELETE CASCADE,
	FOREIGN KEY (post_id) REFERENCES posts(id) ON DELETE CASCADE
);


