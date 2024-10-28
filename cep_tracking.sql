-- MySQL dump 10.13  Distrib 8.0.31, for Win64 (x86_64)
--
-- Host: localhost    Database: cep_tracking
-- ------------------------------------------------------
-- Server version	8.3.0

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
-- Table structure for table `_prisma_migrations`
--

DROP TABLE IF EXISTS `_prisma_migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `_prisma_migrations` (
  `id` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `checksum` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `finished_at` datetime(3) DEFAULT NULL,
  `migration_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `logs` text COLLATE utf8mb4_unicode_ci,
  `rolled_back_at` datetime(3) DEFAULT NULL,
  `started_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `applied_steps_count` int unsigned NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `_prisma_migrations`
--

LOCK TABLES `_prisma_migrations` WRITE;
/*!40000 ALTER TABLE `_prisma_migrations` DISABLE KEYS */;
INSERT INTO `_prisma_migrations` VALUES ('05935820-5135-4a87-86b1-226aa9c29c04','b4aceb4e335ad5c33f762bf2af7b96f3d23714d8eeeb258dd926853462410f30','2024-10-21 18:47:56.217','20240924181632_add_uuid',NULL,NULL,'2024-10-21 18:47:56.114',1),('2589bfd3-30e4-4178-a07e-92d6d20bb690','8adbca681ae64f29babade8a653178cb258546b4337cb3366c8e4d4f323ae8bc','2024-10-21 18:47:56.881','20241009091147_add_admin_view',NULL,NULL,'2024-10-21 18:47:56.221',1),('2d9d18b4-583b-4097-b148-4afc63c36e13','1e6b13e9c94454e35f6b0773f4e61c2fbd96cb1e929ce98ee365eed43b0580a0','2024-10-21 18:48:12.287','20241021184812_update_payment_model',NULL,NULL,'2024-10-21 18:48:12.166',1),('b4050edb-6d9e-4a52-b012-858bf1dfcacc','5ee6490d70a97135db95f447ee4da8b57f6d035bfda0d06ada8de0b94ccc69b2','2024-10-21 18:47:57.293','20241018052432_update_shipment_relations',NULL,NULL,'2024-10-21 18:47:56.885',1),('e3ed159a-2f2e-4b86-b2a5-14f26ff60b29','fdd492df93c894f8e24dd8c4756b4a50aa1cbe8a2c413ad1dab3a85de8057b8e','2024-10-21 18:47:56.110','20240916182650_add_user_address_model',NULL,NULL,'2024-10-21 18:47:54.748',1);
/*!40000 ALTER TABLE `_prisma_migrations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `address`
--

DROP TABLE IF EXISTS `address`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `address` (
  `address_id` int NOT NULL AUTO_INCREMENT,
  `address_line_1` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `address_line_2` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `locality` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `city` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `state` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `pincode` varchar(10) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `uuid` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`address_id`),
  KEY `address_uuid_fkey` (`uuid`),
  CONSTRAINT `address_uuid_fkey` FOREIGN KEY (`uuid`) REFERENCES `user` (`uuid`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `address`
--

LOCK TABLES `address` WRITE;
/*!40000 ALTER TABLE `address` DISABLE KEYS */;
INSERT INTO `address` VALUES (1,'SRMIST Hostels','Thamarai Block','Potheri','Kattankolathur','Tamil Nadu','603203','ca0dec61-9663-4479-862a-01cb07b028ea'),(2,'Jains Avalon Springs','B Block','Potheri','Kattankolathur','Tamil Nadu','603203','ca0dec61-9663-4479-862a-01cb07b028ea'),(3,'testing','testing','testing','Elapakkam','Tamil Nadu','603201','9d867f25-4103-4e09-b75e-1c543ee80067'),(4,'asklfh','Sectore Zeta 1','Potheri','Kattankolathur','Tamil Nadu','603203','6a561275-3d20-4630-83dc-8c576f0d3402'),(5,'Purvanchal Heights, T-9, Flat-A3/107','Sector Zeta 1','Sakipur Village','Alpha Greater Noida','Uttar Pradesh','201310','1c5a6c61-9b1c-4442-a897-9f1466e36640');
/*!40000 ALTER TABLE `address` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `admin`
--

DROP TABLE IF EXISTS `admin`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `admin` (
  `admin_id` int NOT NULL AUTO_INCREMENT,
  `uuid` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `username` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`admin_id`),
  UNIQUE KEY `Admin_uuid_key` (`uuid`),
  UNIQUE KEY `Admin_username_key` (`username`),
  UNIQUE KEY `Admin_email_key` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `admin`
--

LOCK TABLES `admin` WRITE;
/*!40000 ALTER TABLE `admin` DISABLE KEYS */;
/*!40000 ALTER TABLE `admin` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `couriers`
--

DROP TABLE IF EXISTS `couriers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `couriers` (
  `courier_id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `vehicle_id` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `phone_number` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `rating` decimal(3,2) DEFAULT NULL,
  `status` enum('ON_DELIVERY','OFFLINE') COLLATE utf8mb4_unicode_ci DEFAULT 'OFFLINE',
  `gender` enum('MALE','FEMALE') COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `email` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `surname` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`courier_id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `couriers`
--

LOCK TABLES `couriers` WRITE;
/*!40000 ALTER TABLE `couriers` DISABLE KEYS */;
INSERT INTO `couriers` VALUES (3,'Dhar','17UP3002','(98) 7877 8878',NULL,'OFFLINE',NULL,'dh@example.com',NULL),(5,'Rafta','17TN1001','(98) 7877 8878',NULL,'OFFLINE',NULL,'raftah@example.com',NULL),(6,'Kartik','24TN3456','(91) 2345 5432',NULL,'OFFLINE',NULL,'kartik@gmail.com',NULL);
/*!40000 ALTER TABLE `couriers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `payment`
--

DROP TABLE IF EXISTS `payment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `payment` (
  `payment_id` int NOT NULL AUTO_INCREMENT,
  `shipment_id` int DEFAULT NULL,
  `amount` decimal(10,2) DEFAULT NULL,
  `payment_method` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `payment_status` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`payment_id`),
  KEY `shipment_id` (`shipment_id`),
  CONSTRAINT `payment_ibfk_1` FOREIGN KEY (`shipment_id`) REFERENCES `shipment` (`shipment_id`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `payment`
--

LOCK TABLES `payment` WRITE;
/*!40000 ALTER TABLE `payment` DISABLE KEYS */;
INSERT INTO `payment` VALUES (3,NULL,780.00,'Stripe','Success','2024-10-21 19:07:37'),(4,NULL,780.00,'Stripe','Success','2024-10-21 19:07:37'),(5,NULL,780.00,'Stripe','Success','2024-10-21 19:51:48'),(6,NULL,780.00,'Stripe','Success','2024-10-21 19:51:48'),(7,NULL,1500.00,'Stripe','Success','2024-10-23 07:14:08'),(8,7,1500.00,'CARD','PENDING','2024-10-24 05:15:11'),(9,8,1500.00,'CARD','PENDING','2024-10-24 05:16:05'),(10,9,1500.00,'CARD','PENDING','2024-10-24 12:11:47'),(11,10,780.00,'CARD','PENDING','2024-10-24 12:16:36'),(12,NULL,780.00,'Stripe','Success','2024-10-24 12:20:37'),(13,11,2000.00,'CARD','PENDING','2024-10-24 18:44:11'),(14,12,780.00,'CARD','PENDING','2024-10-26 01:47:26'),(15,NULL,780.00,'Stripe','Success','2024-10-26 01:48:05'),(16,NULL,780.00,'Stripe','Success','2024-10-26 01:51:00'),(17,13,480.00,'CARD','PENDING','2024-10-27 13:18:25'),(18,NULL,480.00,'Stripe','Success','2024-10-27 13:18:56');
/*!40000 ALTER TABLE `payment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `shipfrom`
--

DROP TABLE IF EXISTS `shipfrom`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `shipfrom` (
  `shipfrom_id` int NOT NULL AUTO_INCREMENT,
  `first_name` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `last_name` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `email` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `phone_number` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `pincode` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `city` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `locality` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `address_line_1` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `address_line_2` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`shipfrom_id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `shipfrom`
--

LOCK TABLES `shipfrom` WRITE;
/*!40000 ALTER TABLE `shipfrom` DISABLE KEYS */;
INSERT INTO `shipfrom` VALUES (1,'Vachan','Shetty','vachan316@gmail.com','9899770898','603203','Chennai','potheri','srmist hostels','thamrai'),(2,'John','Doe','john@example.com','1234567890','12345','New York','Manhattan','123 Sender Street','Apt 4B'),(3,'John','Doe','john@example.com','1234567890','12345','New York','Manhattan','123 Sender Street','Apt 4B'),(4,'John','Doe','john@example.com','1234567890','12345','New York','Manhattan','123 Sender Street','Apt 4B'),(5,'test','user 3','testuser3@example.com','5858585858','603201','testthecity','testing','testing','testing'),(6,'John','Doe','john@example.com','1234567890','123456','New York','Manhattan','123 Sender Street','Apt 4B'),(7,'Brendan','Miller','bmd@gmail.com','8998899811','603203','Chennai','xyz','Home','Roadway'),(8,'Samuel','Shetty','samuelshetty@gmail.com','3425167890','201310','Greater Noida','Sakipur Village','Purvanchal Heights,T-9, A3/107, Sector Zeta 1','Greater Noida');
/*!40000 ALTER TABLE `shipfrom` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `shipment`
--

DROP TABLE IF EXISTS `shipment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `shipment` (
  `shipment_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  `from_address_id` int DEFAULT NULL,
  `to_address_id` int DEFAULT NULL,
  `shipment_type` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `status` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `is_draft` tinyint(1) DEFAULT '0',
  `is_finalized` tinyint(1) DEFAULT '0',
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`shipment_id`),
  KEY `from_address_id` (`from_address_id`),
  KEY `to_address_id` (`to_address_id`),
  KEY `shipment_ibfk_1` (`user_id`),
  CONSTRAINT `shipment_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`),
  CONSTRAINT `shipment_ibfk_2` FOREIGN KEY (`from_address_id`) REFERENCES `shipfrom` (`shipfrom_id`),
  CONSTRAINT `shipment_ibfk_3` FOREIGN KEY (`to_address_id`) REFERENCES `shipto` (`shipto_id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `shipment`
--

LOCK TABLES `shipment` WRITE;
/*!40000 ALTER TABLE `shipment` DISABLE KEYS */;
INSERT INTO `shipment` VALUES (7,1,2,2,'EXPRESS','PENDING',0,0,'2024-10-24 05:15:11','2024-10-24 05:15:11'),(8,1,3,3,NULL,'ACCEPTED',0,0,'2024-10-24 05:16:05','2024-10-26 01:06:50'),(9,1,4,4,NULL,'REJECTED',0,0,'2024-10-24 12:11:47','2024-10-26 00:34:35'),(10,4,5,5,NULL,'ACCEPTED',0,0,'2024-10-24 12:16:36','2024-10-24 17:10:10'),(11,4,6,6,NULL,'ACCEPTED',0,0,'2024-10-24 18:44:11','2024-10-24 21:09:55'),(12,5,7,7,NULL,'PENDING',0,0,'2024-10-26 01:47:26','2024-10-26 01:47:26'),(13,6,8,8,NULL,'ACCEPTED',0,0,'2024-10-27 13:18:25','2024-10-27 13:19:46');
/*!40000 ALTER TABLE `shipment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `shipmentitem`
--

DROP TABLE IF EXISTS `shipmentitem`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `shipmentitem` (
  `shipment_item_id` int NOT NULL AUTO_INCREMENT,
  `shipment_id` int DEFAULT NULL,
  `item_description` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `quantity` int DEFAULT NULL,
  `weight` decimal(10,2) DEFAULT NULL,
  `value` decimal(10,2) DEFAULT NULL,
  `descriptionOfGoods` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `servicetype` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`shipment_item_id`),
  KEY `shipment_id` (`shipment_id`),
  CONSTRAINT `shipmentitem_ibfk_1` FOREIGN KEY (`shipment_id`) REFERENCES `shipment` (`shipment_id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `shipmentitem`
--

LOCK TABLES `shipmentitem` WRITE;
/*!40000 ALTER TABLE `shipmentitem` DISABLE KEYS */;
INSERT INTO `shipmentitem` VALUES (1,NULL,'Big and Comfy Towels',NULL,3.00,350.00,'Towels','standard'),(2,7,'Electronics',2,5.50,1000.00,'Laptop','EXPRESS'),(3,7,'Accessories',3,1.00,200.00,'Chargers','EXPRESS'),(4,8,'Electronics',2,5.50,1000.00,'Laptop','EXPRESS'),(5,9,'Electronics',2,5.50,1000.00,'Laptop','EXPRESS'),(6,10,'Doughnuts',1,56.00,5600.00,NULL,'STANDARD'),(7,11,'Electronics',3,8.00,1000.00,'Phones','EXPRESS'),(8,12,'PCs',1,50.00,500000.00,NULL,'STANDARD'),(9,13,'Toy Car',1,4.00,2000.00,NULL,'EXPRESS');
/*!40000 ALTER TABLE `shipmentitem` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `shipto`
--

DROP TABLE IF EXISTS `shipto`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `shipto` (
  `shipto_id` int NOT NULL AUTO_INCREMENT,
  `company` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `first_name` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `last_name` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `email` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `phone_number` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `pincode` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `city` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `locality` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `address_line_1` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `address_line_2` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`shipto_id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `shipto`
--

LOCK TABLES `shipto` WRITE;
/*!40000 ALTER TABLE `shipto` DISABLE KEYS */;
INSERT INTO `shipto` VALUES (1,'ABC','Gio','Vani','giovani@example.com','8989898898','111111','New Delhi','hijk','abcd','efgh'),(2,'Receiver Corp','Jane','Smith','jane@example.com','9876543210','67890','Los Angeles','Downtown','456 Receiver Ave','Suite 100'),(3,'Receiver Corp','Jane','Smith','jane@example.com','9876543210','67890','Los Angeles','Downtown','456 Receiver Ave','Suite 100'),(4,'Receiver Corp','Jane','Smith','jane@example.com','9876543210','67890','Los Angeles','Downtown','456 Receiver Ave','Suite 100'),(5,'thetester','testee','testee','testee@example.com','8585858585','603202','testeecity','testeelocality','testeeaddress','testeeaddr'),(6,'Receiver Corp','Jane','Smith','jane@example.com','9876543210','678901','Los Angeles','Downtown','456 Receiver Ave','Suite 100'),(7,'Amazon','Resha','mahong','rhmg@gmail.com','1234567895','403203','Bengaluru','indira nagar','Indira Nagar','AWS, Site Z'),(8,'+-+','uwwu','wuuw','uwu@gmail.com','1234567891','111111','New Delhi','iasuf','sahdfjh','fhfjksh');
/*!40000 ALTER TABLE `shipto` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `first_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `last_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `phone_number` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `emailVerified` tinyint(1) NOT NULL DEFAULT '0',
  `phoneVerified` tinyint(1) NOT NULL DEFAULT '0',
  `uuid` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `user_uuid_key` (`uuid`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'Vachan','Shetty','vachan316@gmail.com','9899770898','vachanshetty','2024-10-21 18:52:31','2024-10-21 18:52:31',0,0,'ca0dec61-9663-4479-862a-01cb07b028ea'),(2,'Test User','testing','test@example.com','1234567890','string','2024-10-22 05:21:34','2024-10-22 05:21:34',0,0,'1239741yorugysd'),(3,'Test User 2','testing 2','test2@example.com','2234567890','string2','2024-10-22 11:04:46','2024-10-22 11:04:46',0,0,'1239741ydgsfdgsdugysd235hhjhg'),(4,'Test ','User 3','testuser3@example.com','5858585858','testing','2024-10-24 17:02:05','2024-10-24 17:02:05',0,0,'9d867f25-4103-4e09-b75e-1c543ee80067'),(5,'Dharka','G','dhg@gmail.com','123456781','qwerty12','2024-10-26 07:17:14','2024-10-26 07:17:14',0,0,'6a561275-3d20-4630-83dc-8c576f0d3402'),(6,'Samuel','Shetty','samuelshetty@gmail.com','4536271890','samuel2017','2024-10-27 18:44:17','2024-10-27 18:44:17',0,0,'1c5a6c61-9b1c-4442-a897-9f1466e36640');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-10-28 15:50:06
