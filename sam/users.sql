-- Create the database if it doesn't exist
CREATE DATABASE IF NOT EXISTS user_management;
USE user_management;

-- Drop existing tables and procedures if they exist
DROP TABLE IF EXISTS users;
DROP PROCEDURE IF EXISTS add_user;
DROP PROCEDURE IF EXISTS remove_user;
DROP PROCEDURE IF EXISTS edit_user;
DROP VIEW IF EXISTS user_list;

-- Create the updated users table
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    category ENUM('admin', 'manager', 'auditor', 'operator') NOT NULL,
    role VARCHAR(100) NOT NULL,
    full_name VARCHAR(100) NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Updated stored procedure to add a new user
DELIMITER //
CREATE PROCEDURE add_user(
    IN p_username VARCHAR(50),
    IN p_password VARCHAR(255),
    IN p_category ENUM('admin', 'manager', 'auditor', 'operator'),
    IN p_role VARCHAR(100),
    IN p_full_name VARCHAR(100),
    IN p_description TEXT
)
BEGIN
    INSERT INTO users (username, password, category, role, full_name, description)
    VALUES (p_username, p_password, p_category, p_role, p_full_name, p_description);
END //
DELIMITER ;

-- Stored procedure to remove a user (unchanged)
DELIMITER //
CREATE PROCEDURE remove_user(
    IN p_user_id INT
)
BEGIN
    DELETE FROM users WHERE id = p_user_id;
END //
DELIMITER ;

-- Updated stored procedure to edit a user
DELIMITER //
CREATE PROCEDURE edit_user(
    IN p_user_id INT,
    IN p_username VARCHAR(50),
    IN p_password VARCHAR(255),
    IN p_category ENUM('admin', 'manager', 'auditor', 'operator'),
    IN p_role VARCHAR(100),
    IN p_full_name VARCHAR(100),
    IN p_description TEXT
)
BEGIN
    UPDATE users
    SET 
        username = COALESCE(p_username, username),
        password = COALESCE(p_password, password),
        category = COALESCE(p_category, category),
        role = COALESCE(p_role, role),
        full_name = COALESCE(p_full_name, full_name),
        description = COALESCE(p_description, description)
    WHERE id = p_user_id;
END //
DELIMITER ;

-- Insert sample users with updated categories
INSERT INTO users (username, password, category, role, full_name, description) VALUES
('admin_user', SHA2('admin_password', 256), 'admin', 'System Administrator', 'Admin User', 'Main administrator account'),
('john_manager', SHA2('manager_password', 256), 'manager', 'Department Manager', 'John Manager', 'Oversees department operations'),
('jane_auditor', SHA2('auditor_password', 256), 'auditor', 'Senior Auditor', 'Jane Auditorwoman', 'Responsible for system audits'),
('rajit_operator', SHA2('operator_password', 256), 'operator', 'Production Operator', 'Rajit Sharma', 'Handles production processes');

-- Create a view to list users without sensitive information (unchanged)
CREATE VIEW user_list AS
SELECT id, username, category, role, full_name, description, created_at, updated_at
FROM users;