CREATE DATABASE smart_factory;

USE smart_factory;

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    role VARCHAR(50) NOT NULL,
    access_code VARCHAR(5) NOT NULL,
    password VARCHAR(100) NOT NULL
);

INSERT INTO users (name, role, access_code, password) VALUES
('Alice Admin', 'administrator', '12345', 'adminpass'),
('Bob Manager', 'factory-manager', '23456', 'managerpass'),
('Charlie Operator', 'production-operator', '34567', 'operatorpass'),
('Diana Auditor', 'auditor', '45678', 'auditorpass'),
('Eve Admin', 'administrator', '56789', 'adminpass2'),
('Frank Manager', 'factory-manager', '67890', 'managerpass2'),
('Grace Operator', 'production-operator', '78901', 'operatorpass2');
