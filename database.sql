CREATE DATABASE IF NOT EXISTS acadtrack;
USE acadtrack;

-- Drop existing tables if re-initializing
DROP TABLE IF EXISTS marks;
DROP TABLE IF EXISTS parents;
DROP TABLE IF EXISTS subjects;
DROP TABLE IF EXISTS students;
DROP TABLE IF EXISTS staff;

-- Staff (Admin, HOD, Faculty)
CREATE TABLE staff (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role VARCHAR(50) NOT NULL,
    name VARCHAR(100) NOT NULL,
    department VARCHAR(100),
    email VARCHAR(100) UNIQUE,
    phone_number VARCHAR(20)
);

-- Students
CREATE TABLE students (
    id INT AUTO_INCREMENT PRIMARY KEY,
    register_no VARCHAR(50) UNIQUE NOT NULL, -- Serves as the login username/uan
    name VARCHAR(100) NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    phone_number VARCHAR(20),
    email VARCHAR(100) UNIQUE,
    department VARCHAR(100),
    current_semester INT,
    batch_year VARCHAR(20)
);

-- Parents
CREATE TABLE parents (
    id INT AUTO_INCREMENT PRIMARY KEY,
    token VARCHAR(100) UNIQUE NOT NULL,
    student_id INT,
    name VARCHAR(100),
    phone_number VARCHAR(20),
    email VARCHAR(100),
    FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE
);

-- Subjects / Courses
CREATE TABLE subjects (
    id INT AUTO_INCREMENT PRIMARY KEY,
    subject_code VARCHAR(50) UNIQUE NOT NULL,
    subject_name VARCHAR(150) NOT NULL,
    department VARCHAR(100),
    semester INT,
    credits INT
);

-- Marks / Grades
CREATE TABLE marks (
    id INT AUTO_INCREMENT PRIMARY KEY,
    student_id INT NOT NULL,
    subject_id INT NOT NULL,
    exam_type VARCHAR(50) NOT NULL, -- e.g., 'Internal', 'Final', 'Assignment'
    marks_obtained DECIMAL(5,2),
    max_marks DECIMAL(5,2),
    grade VARCHAR(5),
    FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE,
    FOREIGN KEY (subject_id) REFERENCES subjects(id) ON DELETE CASCADE
);