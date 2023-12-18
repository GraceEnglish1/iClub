-- MySQL dump 10.13  Distrib 8.0.32, for Linux (x86_64)
--
-- Host: localhost    Database: iclub
-- ------------------------------------------------------
-- Server version	8.0.32-0ubuntu0.22.04.2

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `club_type`
--

DROP TABLE IF EXISTS `club_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `club_type` (
  `id` int NOT NULL AUTO_INCREMENT,
  `description` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `club_type`
--

LOCK TABLES `club_type` WRITE;
/*!40000 ALTER TABLE `club_type` DISABLE KEYS */;
INSERT INTO `club_type` VALUES (1,'sports'),(2,'academic'),(3,'other');
/*!40000 ALTER TABLE `club_type` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `clubs`
--

DROP TABLE IF EXISTS `clubs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `clubs` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) DEFAULT NULL,
  `short_bio` varchar(200) DEFAULT NULL,
  `long_bio` varchar(1000) DEFAULT NULL,
  `club_type_id` int DEFAULT NULL,
  `image_reference` varchar(255) DEFAULT NULL,
  `image_alt` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `club_type_id` (`club_type_id`),
  CONSTRAINT `clubs_ibfk_1` FOREIGN KEY (`club_type_id`) REFERENCES `club_type` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `clubs`
--

LOCK TABLES `clubs` WRITE;
/*!40000 ALTER TABLE `clubs` DISABLE KEYS */;
INSERT INTO `clubs` VALUES (1,'Adelaide Uni Soccer','A club for soccer fans and players at any level','We are a club that was founded in 1980 to support the growing soccer movement in Adelaide. We cater specifically\nto soccer fans at the University of Adelaide, but allow members from any other South Australian university.',1,'./images/sports_icon.png','Sports Icon'),(2,'Debate Club','Debate club is a club for debating','We are a club that was founded in 2001 originally to provide law students a place to practice their mooting skills. We cater specifically\nto law and other like disciplines at the University of Adelaide exclusively.',2,'./images/academic_icon.png','Academic Icon'),(3,'Mathletes','Come and learn about math!','We are a club that was founded in 2013 originally to provide math and other students a place to practice their math skills. We cater specifically\nto math, science and other like disciplines at the University of Adelaide.',2,'./images/academic_icon.png','Academic Icon'),(4,'International Student Society','A club for students from all around the world','We are a club that has been founded recently to cater to the needs of the student body. We provide international students resources and help. We cater specifically\nto the students of the University of Adelaide.',3,'./images/other_icon.jpg','Other Icon');
/*!40000 ALTER TABLE `clubs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `degrees`
--

DROP TABLE IF EXISTS `degrees`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `degrees` (
  `id` int NOT NULL AUTO_INCREMENT,
  `description` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `degrees`
--

LOCK TABLES `degrees` WRITE;
/*!40000 ALTER TABLE `degrees` DISABLE KEYS */;
INSERT INTO `degrees` VALUES (1,'Computer Science'),(2,'Software Engineering'),(3,'Law'),(4,'Commerce'),(5,'Science'),(6,'Supply Chain'),(7,'Arts');
/*!40000 ALTER TABLE `degrees` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `permissions`
--

DROP TABLE IF EXISTS `permissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `permissions` (
  `id` int NOT NULL AUTO_INCREMENT,
  `description` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `permissions`
--

LOCK TABLES `permissions` WRITE;
/*!40000 ALTER TABLE `permissions` DISABLE KEYS */;
INSERT INTO `permissions` VALUES (1,'admin'),(2,'user');
/*!40000 ALTER TABLE `permissions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `person`
--

DROP TABLE IF EXISTS `person`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `person` (
  `id` int NOT NULL AUTO_INCREMENT,
  `permissions` int DEFAULT NULL,
  `first_name` varchar(255) DEFAULT NULL,
  `last_name` varchar(255) DEFAULT NULL,
  `pass` varchar(100) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `degree` int DEFAULT NULL,
  `year_level` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`),
  KEY `permissions` (`permissions`),
  KEY `degree` (`degree`),
  CONSTRAINT `person_ibfk_1` FOREIGN KEY (`permissions`) REFERENCES `permissions` (`id`) ON DELETE SET NULL,
  CONSTRAINT `person_ibfk_2` FOREIGN KEY (`degree`) REFERENCES `degrees` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `person`
--

LOCK TABLES `person` WRITE;
/*!40000 ALTER TABLE `person` DISABLE KEYS */;
INSERT INTO `person` VALUES (1,1,'Grace','English','$argon2id$v=19$m=65536,t=3,p=4$uO1pwgC3/gKU8QeItkWc+A$N0a+y8uov5zqQaTXjHpceech0CJf8XY2Uaaep2JQ5yQ','grace@gmail.com',1,2),(2,2,'John','Smith','$argon2id$v=19$m=65536,t=3,p=4$uO1pwgC3/gKU8QeItkWc+A$N0a+y8uov5zqQaTXjHpceech0CJf8XY2Uaaep2JQ5yQ','john@gmail.com',3,5),(3,2,'Jane','Doe','$argon2id$v=19$m=65536,t=3,p=4$uO1pwgC3/gKU8QeItkWc+A$N0a+y8uov5zqQaTXjHpceech0CJf8XY2Uaaep2JQ5yQ','jane@gmail.com',3,5),(4,2,'Joe','Jones','$argon2id$v=19$m=65536,t=3,p=4$uO1pwgC3/gKU8QeItkWc+A$N0a+y8uov5zqQaTXjHpceech0CJf8XY2Uaaep2JQ5yQ','joe@gmail.com',3,5);
/*!40000 ALTER TABLE `person` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `personrsvptoevent`
--

DROP TABLE IF EXISTS `personrsvptoevent`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `personrsvptoevent` (
  `id` int NOT NULL AUTO_INCREMENT,
  `person_id` int DEFAULT NULL,
  `post_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `person_id` (`person_id`),
  KEY `post_id` (`post_id`),
  CONSTRAINT `personrsvptoevent_ibfk_1` FOREIGN KEY (`person_id`) REFERENCES `person` (`id`) ON DELETE CASCADE,
  CONSTRAINT `personrsvptoevent_ibfk_2` FOREIGN KEY (`post_id`) REFERENCES `posts` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `personrsvptoevent`
--

LOCK TABLES `personrsvptoevent` WRITE;
/*!40000 ALTER TABLE `personrsvptoevent` DISABLE KEYS */;
INSERT INTO `personrsvptoevent` VALUES (1,1,2),(2,2,1),(3,2,2),(4,2,4),(5,3,2),(6,4,2);
/*!40000 ALTER TABLE `personrsvptoevent` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `persontoclub`
--

DROP TABLE IF EXISTS `persontoclub`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `persontoclub` (
  `id` int NOT NULL AUTO_INCREMENT,
  `person_id` int DEFAULT NULL,
  `club_id` int DEFAULT NULL,
  `isManager` tinyint(1) DEFAULT NULL,
  `email_opt_in_events` tinyint(1) DEFAULT '0',
  `email_opt_in_updates` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `person_id` (`person_id`),
  KEY `club_id` (`club_id`),
  CONSTRAINT `persontoclub_ibfk_1` FOREIGN KEY (`person_id`) REFERENCES `person` (`id`) ON DELETE CASCADE,
  CONSTRAINT `persontoclub_ibfk_2` FOREIGN KEY (`club_id`) REFERENCES `clubs` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `persontoclub`
--

LOCK TABLES `persontoclub` WRITE;
/*!40000 ALTER TABLE `persontoclub` DISABLE KEYS */;
INSERT INTO `persontoclub` VALUES (1,1,2,1,1,1),(2,2,2,0,0,1),(3,1,3,0,0,0),(4,1,4,0,0,0);
/*!40000 ALTER TABLE `persontoclub` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `post_type`
--

DROP TABLE IF EXISTS `post_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `post_type` (
  `id` int NOT NULL AUTO_INCREMENT,
  `description` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `post_type`
--

LOCK TABLES `post_type` WRITE;
/*!40000 ALTER TABLE `post_type` DISABLE KEYS */;
INSERT INTO `post_type` VALUES (1,'event'),(2,'update');
/*!40000 ALTER TABLE `post_type` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `posts`
--

DROP TABLE IF EXISTS `posts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `posts` (
  `id` int NOT NULL AUTO_INCREMENT,
  `post_type_id` int DEFAULT NULL,
  `club_id` int DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `post_date` timestamp NULL DEFAULT NULL,
  `content` varchar(1000) DEFAULT NULL,
  `author_id` int DEFAULT NULL,
  `visibility_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `post_type_id` (`post_type_id`),
  KEY `club_id` (`club_id`),
  KEY `author_id` (`author_id`),
  KEY `visibility_id` (`visibility_id`),
  CONSTRAINT `posts_ibfk_1` FOREIGN KEY (`post_type_id`) REFERENCES `post_type` (`id`) ON DELETE SET NULL,
  CONSTRAINT `posts_ibfk_2` FOREIGN KEY (`club_id`) REFERENCES `clubs` (`id`) ON DELETE SET NULL,
  CONSTRAINT `posts_ibfk_3` FOREIGN KEY (`author_id`) REFERENCES `person` (`id`) ON DELETE SET NULL,
  CONSTRAINT `posts_ibfk_4` FOREIGN KEY (`visibility_id`) REFERENCES `visibility` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `posts`
--

LOCK TABLES `posts` WRITE;
/*!40000 ALTER TABLE `posts` DISABLE KEYS */;
INSERT INTO `posts` VALUES (1,1,2,'May Meetup','2023-05-01 00:00:00','Hey all! It is time for our 2023 May Meetup!\nPlease come and share your thoughts on how we can improve\nour club!',1,1),(2,1,4,'May Meetup','2023-05-01 00:00:00','Hey all! It is time for our 2023 May Meetup!\nPlease come and share your thoughts on how we can improve\nour club!',1,1),(3,1,3,'May Mathletes Meetup','2023-05-01 00:00:00','Hey all! It is time for our 2023 May Meetup!\nPlease come and share your thoughts on how we can improve\nour club!',1,1),(4,1,2,'June Meetup','2023-06-01 00:00:00','Hey all! It is time for our 2023 June Meetup!\nPlease come and share your thoughts on how we can improve\nour club!',1,1),(5,1,2,'Special June Meetup','2016-06-02 00:00:00','Shhhh - hey all! Come for our secret June meetup!\nPlease come and share your thoughts on how we can improve\nour club!',1,2),(6,2,1,'NEW EQUIPMENT!','2023-03-27 00:00:00','We are excited to annouce that we have received additional\nfunding to buy new soccer balls! This is due to our new\nsponsor Sports-R-Us who will be sponsoring us for the rest\nof the season. Stay tuned for other exciting news.',2,2),(7,2,1,'Join Our Club','2023-02-20 00:00:00','We are looking forward to inviting incoming students to try\nout and hopefully earn a spot in the club for the upcoming\nseason! We have 10 spots still open between all teams from\nAs to Ds. If you are thinking about joining please come to\nour next meetup.',2,1),(8,2,4,'Join Our Club','2023-02-20 00:00:00','We are looking forward to inviting incoming students to try\nout and hopefully earn a spot in the club for the upcoming\nseason! We have 10 spots still open between all teams from\nAs to Ds. If you are thinking about joining please come to\nour next meetup.',2,1),(9,2,3,'Join Mathletes!','2023-02-20 00:00:00','We are looking forward to inviting incoming students to try\nout and hopefully earn a spot in the club for the upcoming\nseason! We have 10 spots still open between all teams from\nAs to Ds. If you are thinking about joining please come to\nour next meetup.',2,1),(10,1,1,'June Soccer Meeting','2023-06-02 00:00:00','Please come to our June Soccer meetup and meet everyone on\nthe team. It will be a great way to celebrate end of exams',2,1),(11,1,1,'Secret June Soccer Meeting','2023-06-02 00:00:00','Please come to our special, secret June Soccer meetup and meet everyone on\nthe team. It will be a great way to celebrate end of exams',2,2),(12,2,2,'NEW BOOKS!','2023-03-27 00:00:00','We are excited to annouce that we have received additional\nfunding to buy new books to help with research! This is due to our new\nsponsor Books-R-Us who will be sponsoring us for the rest\nof the season. Stay tuned for other exciting news.',2,2),(13,2,2,'Join Our Club','2023-02-20 00:00:00','We are looking forward to inviting incoming students to try\nout and hopefully earn a spot in the club for the upcoming\nseason! If you are thinking about joining please come to\nour next meetup.',2,1);
/*!40000 ALTER TABLE `posts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `visibility`
--

DROP TABLE IF EXISTS `visibility`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `visibility` (
  `id` int NOT NULL AUTO_INCREMENT,
  `description` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `visibility`
--

LOCK TABLES `visibility` WRITE;
/*!40000 ALTER TABLE `visibility` DISABLE KEYS */;
INSERT INTO `visibility` VALUES (1,'public'),(2,'private');
/*!40000 ALTER TABLE `visibility` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-06-09 11:10:58
