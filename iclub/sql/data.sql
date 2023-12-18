INSERT INTO permissions(description)
VALUES
('admin'),
('user');

INSERT INTO degrees(description)
VALUES
('Computer Science'),
('Software Engineering'),
('Law'),
('Commerce'),
('Science'),
('Supply Chain'),
('Arts');

INSERT INTO post_type(description)
VALUES
('event'),
('update');

INSERT INTO club_type(description)
VALUES
('sports'),
('academic'),
('other');

INSERT INTO visibility(description)
VALUES
('public'),
('private');

INSERT INTO person(
	permissions,
	first_name,
	last_name,
	pass,
	email,
	degree,
	year_level
	)
VALUES
(1, 'Grace', 'English', '$argon2id$v=19$m=65536,t=3,p=4$uO1pwgC3/gKU8QeItkWc+A$N0a+y8uov5zqQaTXjHpceech0CJf8XY2Uaaep2JQ5yQ', 'grace@gmail.com', 1, 2),
(2, 'John', 'Smith','$argon2id$v=19$m=65536,t=3,p=4$uO1pwgC3/gKU8QeItkWc+A$N0a+y8uov5zqQaTXjHpceech0CJf8XY2Uaaep2JQ5yQ', 'john@gmail.com', 3, 5),
(2, 'Jane', 'Doe','$argon2id$v=19$m=65536,t=3,p=4$uO1pwgC3/gKU8QeItkWc+A$N0a+y8uov5zqQaTXjHpceech0CJf8XY2Uaaep2JQ5yQ', 'jane@gmail.com', 3, 5),
(2, 'Joe', 'Jones','$argon2id$v=19$m=65536,t=3,p=4$uO1pwgC3/gKU8QeItkWc+A$N0a+y8uov5zqQaTXjHpceech0CJf8XY2Uaaep2JQ5yQ', 'joe@gmail.com', 3, 5);

INSERT INTO clubs(
	name,
	short_bio,
	long_bio,
	club_type_id,
	image_reference,
	image_alt
	)
VALUES
('Adelaide Uni Soccer', 'A club for soccer fans and players at any level',
'We are a club that was founded in 1980 to support the growing soccer movement in Adelaide. We cater specifically
to soccer fans at the University of Adelaide, but allow members from any other South Australian university.',
1, './images/sports_icon.png', 'Sports Icon'),
('Debate Club', 'Debate club is a club for debating',
'We are a club that was founded in 2001 originally to provide law students a place to practice their mooting skills. We cater specifically
to law and other like disciplines at the University of Adelaide exclusively.',
2, './images/academic_icon.png', 'Academic Icon'),
('Mathletes', 'Come and learn about math!',
'We are a club that was founded in 2013 originally to provide math and other students a place to practice their math skills. We cater specifically
to math, science and other like disciplines at the University of Adelaide.',
2, './images/academic_icon.png', 'Academic Icon'),
('International Student Society', 'A club for students from all around the world',
'We are a club that has been founded recently to cater to the needs of the student body. We provide international students resources and help. We cater specifically
to the students of the University of Adelaide.',
3, './images/other_icon.jpg', 'Other Icon');

INSERT INTO posts(
	post_type_id,
	club_id,
	title,
	post_date,
	content,
	author_id,
	visibility_id
	)
VALUES
(1, 2, 'May Meetup', '2023-05-01',
'Hey all! It is time for our 2023 May Meetup!
Please come and share your thoughts on how we can improve
our club!', 1, 1),
(1, 4, 'May Meetup', '2023-05-01',
'Hey all! It is time for our 2023 May Meetup!
Please come and share your thoughts on how we can improve
our club!', 1, 1),
(1, 3, 'May Mathletes Meetup', '2023-05-01',
'Hey all! It is time for our 2023 May Meetup!
Please come and share your thoughts on how we can improve
our club!', 1, 1),
(1, 2, 'June Meetup', '2023-06-01',
'Hey all! It is time for our 2023 June Meetup!
Please come and share your thoughts on how we can improve
our club!', 1, 1),
(1, 2, 'Special June Meetup', '2016-06-02',
'Shhhh - hey all! Come for our secret June meetup!
Please come and share your thoughts on how we can improve
our club!', 1, 2),
(2, 1, 'NEW EQUIPMENT!', '2023-03-27',
'We are excited to annouce that we have received additional
funding to buy new soccer balls! This is due to our new
sponsor Sports-R-Us who will be sponsoring us for the rest
of the season. Stay tuned for other exciting news.',
2, 2),
(2, 1, 'Join Our Club', '2023-02-20',
'We are looking forward to inviting incoming students to try
out and hopefully earn a spot in the club for the upcoming
season! We have 10 spots still open between all teams from
As to Ds. If you are thinking about joining please come to
our next meetup.',
2, 1),
(2, 4, 'Join Our Club', '2023-02-20',
'We are looking forward to inviting incoming students to try
out and hopefully earn a spot in the club for the upcoming
season! We have 10 spots still open between all teams from
As to Ds. If you are thinking about joining please come to
our next meetup.',
2, 1),
(2, 3, 'Join Mathletes!', '2023-02-20',
'We are looking forward to inviting incoming students to try
out and hopefully earn a spot in the club for the upcoming
season! We have 10 spots still open between all teams from
As to Ds. If you are thinking about joining please come to
our next meetup.',
2, 1),
(1, 1, 'June Soccer Meeting', '2023-06-02',
'Please come to our June Soccer meetup and meet everyone on
the team. It will be a great way to celebrate end of exams',
2, 1),
(1, 1, 'Secret June Soccer Meeting', '2023-06-02',
'Please come to our special, secret June Soccer meetup and meet everyone on
the team. It will be a great way to celebrate end of exams',
2, 2),
(2, 2, 'NEW BOOKS!', '2023-03-27',
'We are excited to annouce that we have received additional
funding to buy new books to help with research! This is due to our new
sponsor Books-R-Us who will be sponsoring us for the rest
of the season. Stay tuned for other exciting news.',
2, 2),
(2, 2, 'Join Our Club', '2023-02-20',
'We are looking forward to inviting incoming students to try
out and hopefully earn a spot in the club for the upcoming
season! If you are thinking about joining please come to
our next meetup.',
2, 1);

INSERT INTO persontoclub(
	person_id,
	club_id,
	isManager,
	email_opt_in_events,
	email_opt_in_updates
	)
VALUES
(1, 2, TRUE, TRUE, TRUE),
(2, 2, FALSE, FALSE, TRUE),
(1,3, FALSE, FALSE, FALSE),
(1,4, FALSE, FALSE, FALSE);

INSERT INTO personrsvptoevent(
	person_id,
	post_id
	)
VALUES
(1, 2),
(2, 1),
(2, 2),
(2, 4),
(3, 2),
(4, 2);