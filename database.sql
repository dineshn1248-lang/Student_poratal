CREATE DATABASE acadtrack;
USE acadtrack;

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100),
    email VARCHAR(100) UNIQUE,
    password VARCHAR(100),
    role VARCHAR(20)
);

INSERT INTO users (name, email, password, role) VALUES
('Dr. Ramesh Kumar', 'principal@college.com', '1234', 'principal'),
('HOD Kumar', 'hod@college.com', '1234', 'hod'),
('Faculty Ravi', 'faculty@college.com', '1234', 'faculty');


CREATE TABLE students (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100),
    department VARCHAR(50),
    marks INT,
    status VARCHAR(20)
);

INSERT INTO students (name, department, marks, status) VALUES
('Arjun', 'BCA', 85, 'pass'),
('Ravi', 'BSc', 40, 'backlog'),
('Meena', 'BBA', 78, 'pass'),
('Kiran', 'MSc', 30, 'backlog');