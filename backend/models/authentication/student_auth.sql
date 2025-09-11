CREATE TABLE students (
    student_id VARCHAR(12) PRIMARY KEY,        
    student_name VARCHAR(50) NOT NULL,
    student_email VARCHAR(40) UNIQUE NOT NULL,
    student_contact VARCHAR(12),
    student_branch VARCHAR(10),
    student_password VARCHAR(150) NOT NULL
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;