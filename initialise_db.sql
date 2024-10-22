-- First create the database
CREATE DATABASE smart_manufacturing;

-- Select the database to use
USE smart_manufacturing;

-- Create the users table
CREATE TABLE users (
    user_id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    role ENUM('admin', 'manager', 'auditor', 'operator') NOT NULL,
    job VARCHAR(100),
    description TEXT
);

INSERT INTO users (name, role, job, description)
VALUES ('John Doe', 'manager', 'Line Manager 1', 'Responsible for production line 1');