-- First create the database
CREATE DATABASE smart_manufacturing;

-- Select the database to use
USE smart_manufacturing;

-- Create the users table
CREATE TABLE IF NOT EXISTS `users` (
    `user_id` int(11) NOT NULL AUTO_INCREMENT,
    `name` varchar(100) NOT NULL,
    `role` enum('admin', 'manager', 'auditor', 'operator') NOT NULL,
    `job` varchar(100) DEFAULT NULL,
    `description` text DEFAULT NULL,
    PRIMARY KEY (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE IF NOT EXISTS `machines` (
  `id` int(11) NOT NULL,
  `timestamp` datetime NOT NULL,
  `machine_name` varchar(50) NOT NULL,
  `temperature` decimal(5,2) NOT NULL,
  `pressure` decimal(5,2) NOT NULL,
  `vibration` decimal(5,2) NOT NULL,
  `humidity` decimal(5,2) NOT NULL,
  `power_consumption` decimal(7,2) NOT NULL,
  `operational_status` enum('active','inactive') NOT NULL,
  `error_code` varchar(20) DEFAULT NULL,
  `production_count` int(11) DEFAULT NULL,
  `maintenance_log` varchar(255) DEFAULT NULL,
  `speed` decimal(5,2) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE IF NOT EXISTS `jobs` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `status` enum('queued','progress','finished') NOT NULL,
  `notes` text DEFAULT NULL,
  `operator` int(11) NOT NULL,
  `machine` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`operator`) REFERENCES users(`user_id`),
  FOREIGN KEY (`machine`) REFERENCES machines(`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


INSERT INTO `users` (`name`, `role`, `job`, `description`)
VALUES 
('Bob Johnson', 'manager', 'Line Manager 1', 'Responsible for production line 1'),
('Rajit Sharma', 'operator', 'Machine technician', 'fixes and maintains machines'),
('John Auditor', 'auditor', 'ATO auditor', 'auditor for ato'),
('Johnny Admin', 'admin', 'systems admin', 'administrator');

INSERT INTO `machines` (`id`, `timestamp`, `machine_name`, `temperature`, `pressure`, `vibration`, `humidity`, `power_consumption`, `operational_status`, `error_code`, `production_count`, `maintenance_log`, `speed`) VALUES
(3, '0000-00-00 00:00:00', 'CNC Machine', 45.47, 7.69, 1.86, 33.17, 270.22, 'active', '', 66, '', 4.27),
(4, '0000-00-00 00:00:00', '3D Printer', 71.18, 3.16, 0.24, 36.76, 330.36, 'active', '', 96, '', 3.35);

INSERT INTO `jobs` (`name`, `status`, `notes`, `operator`, `machine`) VALUES
('Play with 3d printer', 'queued', 'play around', 2, 4);

INSERT INTO `machines` (`id`, `timestamp`, `machine_name`, `temperature`, `pressure`, `vibration`, `humidity`, `power_consumption`, `operational_status`, `error_code`, `production_count`, `maintenance_log`, `speed`) VALUES
(3, '0000-00-00 00:00:00', 'CNC Machine', 45.47, 7.69, 1.86, 33.17, 270.22, 'active', '', 66, '', 4.27),
(4, '0000-00-00 00:00:00', '3D Printer', 71.18, 3.16, 0.24, 36.76, 330.36, 'active', '', 96, '', 3.35),
(5, '0000-00-00 00:00:00', 'Industrial Robot', 61.09, 6.81, 4.83, 62.59, 460.07, '', 'E303', 73, 'Part Replacement', 3.41),
(6, '0000-00-00 00:00:00', 'Automated Guided Vehicle (AGV)', 33.71, 4.13, 1.15, 34.09, 171.69, 'active', '', 99, '', 0.00),
(7, '0000-00-00 00:00:00', 'Smart Conveyor System', 24.48, 8.37, 0.76, 54.26, 170.14, 'active', '', 4, '', 1.11),
(8, '0000-00-00 00:00:00', 'IoT Sensor Hub', 40.93, 4.97, 0.49, 54.51, 464.51, 'active', '', 21, '', 0.00),
(9, '0000-00-00 00:00:00', 'Predictive Maintenance System', 26.04, 9.40, 0.28, 68.58, 233.56, '', '', 24, '', 0.00),
(10, '0000-00-00 00:00:00', 'Automated Assembly Line', 41.89, 3.85, 3.29, 66.15, 236.15, 'active', '', 74, '', 0.00),
(11, '0000-00-00 00:00:00', 'Quality Control Scanner', 74.66, 3.22, 4.27, 67.80, 139.24, '', 'E303', 8, 'Part Replacement', 0.00),
(12, '0000-00-00 00:00:00', 'Energy Management System', 50.62, 6.21, 2.32, 34.80, 330.92, 'active', '', 77, '', 0.00),
(13, '0000-00-00 00:00:00', 'CNC Machine', 36.58, 5.23, 0.55, 45.31, 493.18, 'active', '', 41, '', 2.48),
(14, '0000-00-00 00:00:00', '3D Printer', 77.49, 3.37, 1.72, 62.91, 275.05, 'active', '', 78, '', 2.43),
(15, '0000-00-00 00:00:00', 'Industrial Robot', 71.73, 4.01, 1.07, 67.15, 418.37, 'active', '', 3, '', 0.88),
(16, '0000-00-00 00:00:00', 'Automated Guided Vehicle (AGV)', 24.44, 4.54, 4.73, 40.30, 368.32, 'active', '', 89, '', 0.00),
(17, '0000-00-00 00:00:00', 'Smart Conveyor System', 53.00, 8.04, 3.35, 69.03, 190.64, 'active', '', 97, '', 2.78),
(18, '0000-00-00 00:00:00', 'IoT Sensor Hub', 64.42, 5.66, 0.41, 38.42, 496.32, '', '', 57, '', 0.00),
(19, '0000-00-00 00:00:00', 'Predictive Maintenance System', 69.22, 6.39, 0.47, 61.99, 134.38, 'active', '', 27, '', 0.00),
(20, '0000-00-00 00:00:00', 'Automated Assembly Line', 28.60, 1.01, 1.73, 30.42, 474.88, 'active', '', 83, '', 0.00),
(21, '0000-00-00 00:00:00', 'Quality Control Scanner', 68.40, 4.34, 4.54, 33.53, 162.21, 'active', '', 75, '', 0.00),
(22, '0000-00-00 00:00:00', 'Energy Management System', 21.07, 5.40, 0.88, 49.23, 126.01, 'active', '', 80, '', 0.00),
(23, '0000-00-00 00:00:00', 'CNC Machine', 72.44, 7.79, 4.00, 47.77, 148.32, 'active', '', 4, '', 0.68),
(24, '0000-00-00 00:00:00', '3D Printer', 67.81, 3.07, 3.03, 34.07, 411.98, '', 'E202', 24, 'Software Update', 3.22),
(25, '0000-00-00 00:00:00', 'Industrial Robot', 34.14, 6.38, 0.64, 56.90, 305.15, 'active', '', 70, '', 1.78),
(26, '0000-00-00 00:00:00', 'Automated Guided Vehicle (AGV)', 42.57, 6.75, 1.72, 60.24, 458.33, 'active', '', 32, '', 0.00),
(27, '0000-00-00 00:00:00', 'Smart Conveyor System', 29.50, 2.90, 2.24, 33.93, 398.46, '', '', 40, '', 4.56),
(28, '0000-00-00 00:00:00', 'IoT Sensor Hub', 55.42, 8.48, 0.16, 57.77, 132.68, 'active', '', 61, '', 0.00),
(29, '0000-00-00 00:00:00', 'Predictive Maintenance System', 71.93, 5.96, 3.70, 52.04, 286.35, '', 'E202', 77, 'Software Update', 0.00),
(30, '0000-00-00 00:00:00', 'Automated Assembly Line', 42.03, 4.14, 1.94, 64.10, 186.36, 'active', '', 50, '', 0.00),
(31, '0000-00-00 00:00:00', 'Quality Control Scanner', 29.30, 9.48, 3.55, 41.06, 163.61, '', 'E202', 56, 'Software Update', 0.00),
(32, '0000-00-00 00:00:00', 'Energy Management System', 75.81, 5.64, 4.01, 41.48, 482.18, 'active', '', 79, '', 0.00),
(33, '0000-00-00 00:00:00', 'CNC Machine', 39.73, 8.97, 0.99, 32.55, 435.58, '', '', 29, '', 3.31),
(34, '0000-00-00 00:00:00', '3D Printer', 49.02, 9.15, 0.39, 60.25, 189.79, 'active', '', 37, '', 1.31),
(35, '0000-00-00 00:00:00', 'Industrial Robot', 37.72, 3.32, 1.76, 35.47, 417.48, 'active', '', 77, '', 1.83),
(36, '0000-00-00 00:00:00', 'Automated Guided Vehicle (AGV)', 21.55, 8.12, 1.52, 40.02, 285.25, 'active', '', 63, '', 0.00),
(37, '0000-00-00 00:00:00', 'Smart Conveyor System', 41.62, 1.37, 1.20, 69.65, 477.07, '', '', 92, '', 4.94)