-- create table student_attendence(
--     st_Id varchar(12),
--     st_name varchar(50),
--     subject_name varchar(30),
--     attendence_status int,
--     attendece_ratio int,
--     todays_date date,
--     timing time
-- );
CREATE TABLE student_attendance (
    attendance_id INT AUTO_INCREMENT PRIMARY KEY,
    student_id VARCHAR(12) NOT NULL,
    subject_name VARCHAR(50) NOT NULL,
    attendance_status TINYINT NOT NULL,   -- 1 = present, 0 = absent
    todays_date DATE NOT NULL,
    timing TIME NOT NULL,

    -- Foreign key
    CONSTRAINT fk_att_student FOREIGN KEY (student_id) 
        REFERENCES students(student_id)
        ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;