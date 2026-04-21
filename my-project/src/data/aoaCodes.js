// src/data/aoaCodes.js
export const JAVA_CODES = [
  {
    title: "database creation",
    code: `
create database school;
use school;
DROP TABLE IF EXISTS students;
    `,
  },
  {
    title: "EXP-2 :Performing practical by using DDL statements",
    code: `
    CREATE TABLE students (
  id INT PRIMARY KEY,
  name VARCHAR(50) NOT NULL,
  age INT CHECK (age >= 18),
  marks INT CHECK (marks >= 0 AND marks <= 100),
  email VARCHAR(100) UNIQUE
);

INSERT INTO students (id, name, age, marks, email) VALUES (1, 'Alice', 20, 85, 'alice@example.com');

ALTER TABLE students
ADD CONSTRAINT unique_email UNIQUE(email);

select * from students;

DROP TABLE students;
    `,
  },
  {
    title: "EXP-3 Performing practical by using Aggregate functions.",
    code: `
    CREATE TABLE students (
  id INT PRIMARY KEY,
  name VARCHAR(50) NOT NULL,
  age INT CHECK (age >= 18),
  marks INT CHECK (marks >= 0 AND marks <= 100),
  email VARCHAR(100) UNIQUE
);

INSERT INTO students (id, name, age, marks, email) VALUES (1, 'Alice', 20, 85, 'alice@example.com');

SELECT COUNT(*) FROM students;

SELECT SUM(marks) FROM students;

SELECT AVG(marks) FROM students;

SELECT MAX(marks) FROM students;

SELECT MIN(marks) FROM students;
    `,
  },
  {
    title: "EXP-4 Performing practical by using SET operators like Union,Intersect etc.",
    code: `
## TABLES ##
CREATE TABLE students (
  id INT PRIMARY KEY,
  name VARCHAR(50)
);
CREATE TABLE teachers (
  id INT PRIMARY KEY,
  name VARCHAR(50)
);

##  SAMPLE ##
INSERT INTO students VALUES
(1, 'Charas'),
(2, 'Rahul'),
(3, 'Amit');
INSERT INTO teachers VALUES
(1, 'Amit'),
(2, 'Suresh'),
(3, 'Mohan');

SELECT name FROM students
UNION
SELECT name FROM teachers;

SELECT name FROM students
INTERSECT
SELECT name FROM teachers;

SELECT name FROM students
EXCEPT
SELECT name FROM teachers;
    `,
  },
  {
    title: "EXP-5 Perform practical by using GROUP BY and ORDERBY Clause.",
    code: `
    CREATE TABLE students (
  id INT PRIMARY KEY,
  name VARCHAR(50) NOT NULL,
  age INT CHECK (age >= 18),
  marks INT CHECK (marks >= 0 AND marks <= 100),
  course VARCHAR(50) NOT NULL,
  email VARCHAR(100) UNIQUE
);

INSERT INTO students (id, name, age, marks, courses, email) VALUES (1, 'Alice', 20, 85, 'cs', 'alice@example.com');

SELECT course, COUNT(*) AS total_students
FROM students
GROUP BY course;  --{groups student on courses and counts them}

SELECT name, marks
FROM students
ORDER BY marks DESC;

SELECT course, AVG(marks) AS avg_marks
FROM students
GROUP BY course
ORDER BY avg_marks DESC;
    `,
  },
    {
    title: "EXP-6 Perform practical by using HAVING Clause.",
    code: `
    CREATE TABLE students (
  id INT PRIMARY KEY,
  name VARCHAR(50) NOT NULL,
  age INT CHECK (age >= 18),
  marks INT CHECK (marks >= 0 AND marks <= 100),
  course VARCHAR(50) NOT NULL,
  email VARCHAR(100) UNIQUE
);

INSERT INTO students (id, name, age, marks, course, email) VALUES (1, 'Alice', 20, 85, 'cs', 'alice@example.com');

SELECT course, COUNT(*) AS total_students
FROM students
GROUP BY course
HAVING COUNT(*) ;

SELECT course, AVG(marks) AS avg_marks
FROM students
GROUP BY course
HAVING AVG(marks) ;

SELECT course, SUM(marks) AS total_marks
FROM students
GROUP BY course
HAVING SUM(marks) 
ORDER BY total_marks DESC;
    `,
  },
  {
    title: "EXP-7 Execute Queries using Inner JOIN operation.",
    code: `

CREATE TABLE courses (
  id INT PRIMARY KEY,
  course_name VARCHAR(50)
);
CREATE TABLE students (
  id INT PRIMARY KEY,
  name VARCHAR(50),
  course_id INT,
  FOREIGN KEY (course_id) REFERENCES courses(id)
);

INSERT INTO courses VALUES
(1, 'CS'),
(2, 'IT'),
(3, 'Mechanical');
INSERT INTO students VALUES
(1, 'Jatin', 1),
(2, 'Rahul', 2),
(3, 'Amit', 1),
(4, 'Suresh', NULL);

SELECT students.name, courses.course_name
FROM students
INNER JOIN courses
ON students.course_id = courses.id;

SELECT s.name, c.course_name  -- {for multiple tables}
FROM students s
INNER JOIN courses c
ON s.course_id = c.id;

    `,
  },
  {
    title: "EXP-8 Execute Queries using Left outer JOIN operation.",
    code: `
CREATE TABLE courses (
  id INT PRIMARY KEY,
  course_name VARCHAR(50)
);
CREATE TABLE students (
  id INT PRIMARY KEY,
  name VARCHAR(50),
  course_id INT,
  FOREIGN KEY (course_id) REFERENCES courses(id)
);

INSERT INTO courses VALUES
(1, 'CS'),
(2, 'IT'),
(3, 'Mechanical');
INSERT INTO students VALUES
(1, 'Jatin', 1),
(2, 'Rahul', 2),
(3, 'Amit', 1),
(4, 'Suresh', NULL);

SELECT students.name, courses.course_name
FROM students
LEFT JOIN courses
ON students.course_id = courses.id;

SELECT students.name  --{for non-matching records}
FROM students
LEFT JOIN courses
ON students.course_id = courses.id
WHERE courses.id IS NULL;
    `,
  },
  {
    title: "EXP-9 Execute Queries using Right outer JOIN operation.",
    code: `
CREATE TABLE courses (
  id INT PRIMARY KEY,
  course_name VARCHAR(50)
);
CREATE TABLE students (
  id INT PRIMARY KEY,
  name VARCHAR(50),
  course_id INT,
  FOREIGN KEY (course_id) REFERENCES courses(id)
);

INSERT INTO courses VALUES
(1, 'CS'),
(2, 'IT'),
(3, 'Mechanical');
INSERT INTO students VALUES
(1, 'Jatin', 1),
(2, 'Rahul', 2),
(3, 'Amit', 1),
(4, 'Suresh', NULL);

SELECT students.name, courses.course_name
FROM students
RIGHT JOIN courses
ON students.course_id = courses.id;

SELECT courses.course_name    --{for non-matching records}
FROM students
RIGHT JOIN courses
ON students.course_id = courses.id
WHERE students.id IS NULL;
    `,
  },

  {
    title: "EXP-10 Execute Queries using Full outer JOIN operation.",
    code: `
CREATE TABLE courses (
  id INT PRIMARY KEY,
  course_name VARCHAR(50)
);
CREATE TABLE students (
  id INT PRIMARY KEY,
  name VARCHAR(50),
  course_id INT,
  FOREIGN KEY (course_id) REFERENCES courses(id)
);

INSERT INTO courses VALUES
(1, 'CS'),
(2, 'IT'),
(3, 'Mechanical');
INSERT INTO students VALUES
(1, 'Jatin', 1),
(2, 'Rahul', 2),
(3, 'Amit', 1),
(4, 'Suresh', NULL);

SELECT students.name, courses.course_name
FROM students
FULL OUTER JOIN courses
ON students.course_id = courses.id;

SELECT students.name, courses.course_name
FROM students
FULL OUTER JOIN courses
ON students.course_id = courses.id
WHERE students.id IS NULL OR courses.id IS NULL;



--if the above things do not work then try This:-
SELECT students.name, courses.course_name
FROM students
LEFT JOIN courses
ON students.course_id = courses.id

UNION

SELECT students.name, courses.course_name
FROM students
RIGHT JOIN courses
ON students.course_id = courses.id;
    `,
  },
  {
    title: "EXP-11 Performing practical by using VIEWS.",
    code: `
  CREATE TABLE students (
  id INT PRIMARY KEY,
  name VARCHAR(50) NOT NULL,
  age INT CHECK (age >= 18),
  marks INT CHECK (marks >= 0 AND marks <= 100),
  course VARCHAR(50) NOT NULL,
  email VARCHAR(100) UNIQUE
);

INSERT INTO students VALUES
(1, 'Jatin', 1),
(2, 'Rahul', 2),
(3, 'Amit', 1),
(4, 'Suresh', NULL);

CREATE VIEW student_view AS
SELECT name, course_id
FROM students;

--display view data:-
SELECT * FROM student_view;

--update view data:-
CREATE OR REPLACE VIEW student_view AS
SELECT name
FROM students;

--drop view:-
DROP VIEW student_view;
    `,
  },
  {
    title: "EXP-12 Performing practical by using TRIGGER concept.",
    code: `
-- Clean setup
DROP TABLE IF EXISTS student_log;
DROP TABLE IF EXISTS students;

-- Create students table
CREATE TABLE students (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(50),
  marks INT
);

-- Create log table
CREATE TABLE student_log (
  log_id INT AUTO_INCREMENT PRIMARY KEY,
  message VARCHAR(100)
);

-- Change delimiter for trigger creation
DELIMITER $$

-- BEFORE INSERT trigger (fix negative marks)
CREATE TRIGGER check_marks
BEFORE INSERT ON students
FOR EACH ROW
BEGIN
  IF NEW.marks < 0 THEN
    SET NEW.marks = 0;
  END IF;
END$$

-- AFTER INSERT trigger (logging)
CREATE TRIGGER after_insert_log
AFTER INSERT ON students
FOR EACH ROW
BEGIN
  INSERT INTO student_log(message)
  VALUES (CONCAT('Inserted student: ', NEW.name));
END$$

DELIMITER ;

-- Test data
INSERT INTO students (name, marks) VALUES
('Jatin', 85),
('Rahul', -10),   -- will become 0
('Amit', 70);

-- Check results
SELECT * FROM students;
SELECT * FROM student_log;

-- Drop trigger (example)
DROP TRIGGER check_marks;
    `,
  },
  {
    title: "EXP-13 Execute queries for Exist and NOT EXIST.",
    code: `
-- Clean setup
DROP TABLE IF EXISTS students;
DROP TABLE IF EXISTS courses;

-- Create tables
CREATE TABLE courses (
  id INT PRIMARY KEY,
  course_name VARCHAR(50)
);

CREATE TABLE students (
  id INT PRIMARY KEY,
  name VARCHAR(50),
  course_id INT
);

-- Insert data into courses
INSERT INTO courses VALUES
(1, 'CS'),
(2, 'IT');

-- Insert data into students
INSERT INTO students VALUES
(1, 'Jatin', 1),
(2, 'Rahul', 2),
(3, 'Amit', 3),     -- no matching course
(4, 'Suresh', NULL);

-- EXISTS Example
SELECT name
FROM students s
WHERE EXISTS (
  SELECT 1
  FROM courses c
  WHERE s.course_id = c.id
);

-- NOT EXISTS Example
SELECT name
FROM students s
WHERE NOT EXISTS (
  SELECT 1
  FROM courses c
  WHERE s.course_id = c.id
);
    `,
  },
  {
    title: " EXP-14 Performing practical by using DCL (Grant ,Revoke) statements.",
    code: ` 
CREATE DATABASE IF NOT EXISTS college_db;
USE college_db;

-- Create sample table
DROP TABLE IF EXISTS students;

CREATE TABLE students (
  id INT PRIMARY KEY,
  name VARCHAR(50)
);

-- Insert sample data
INSERT INTO students VALUES
(1, 'Jatin'),
(2, 'Rahul');

-- Create user (MySQL syntax)
CREATE USER IF NOT EXISTS 'user1'@'localhost' IDENTIFIED BY 'password123';

-- GRANT permissions
GRANT SELECT, INSERT
ON college_db.students
TO 'user1'@'localhost';

-- GRANT ALL privileges
GRANT ALL PRIVILEGES
ON college_db.students
TO 'user1'@'localhost';

-- REVOKE INSERT permission
REVOKE INSERT
ON college_db.students
FROM 'user1'@'localhost';

-- REVOKE ALL privileges
REVOKE ALL PRIVILEGES
ON college_db.students
FROM 'user1'@'localhost';

-- Apply changes
FLUSH PRIVILEGES;

--TO SHOW THE GRANTS FOR THE USER
SHOW GRANTS FOR 'user1'@'localhost';

--Replace 'user1'@'localhost' if needed
    `,

  }
];
