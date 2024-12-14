-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Dec 14, 2024 at 01:18 PM
-- Server version: 8.0.30
-- PHP Version: 8.1.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `user_management`
--

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int NOT NULL,
  `name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `dob` date NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password`, `dob`, `created_at`, `updated_at`) VALUES
(5, 'Goqii', 'Rahul@goqii.com', '$2y$10$/dNkFlzRZTyuwNj.q3v6VuzSSrgCNGsM1GgngvLQoxCtxNjld1mq2', '1995-01-21', '2024-12-14 13:15:12', '2024-12-14 13:15:12'),
(6, 'Ram', 'Ram@gmail.com', '$2y$10$aM9LdSS9RFP82Dt.B68pYus13hldvnll2NuEu8qrWiTUBi57czrdq', '2022-01-12', '2024-12-14 13:15:44', '2024-12-14 13:15:44'),
(7, 'sham', 'sham@gmai.com', '$2y$10$Xz7tIiiIs64KrOFx67ve0.BTlMzBco2UzctmXp/ymwREXfcKeu22S', '2024-12-13', '2024-12-14 13:16:12', '2024-12-14 13:16:12'),
(8, 'tetst1', 'rahulngupta9725@gmail.com', '$2y$10$PGIfEubNeWeJfcNSvFi4R.IgnVojF4V7oJB9nhsf8MrjGekv3mQPO', '2024-12-05', '2024-12-14 13:16:38', '2024-12-14 13:16:38');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD KEY `idx_email` (`email`),
  ADD KEY `idx_name` (`name`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
