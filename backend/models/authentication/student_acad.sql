-- create table student_acad(
--     st_name varchar(50),
--     st_Id varchar(12),
--     st_subject varchar(20),
--     st_semester int,
--     st_attendence int,
--     st_grades varchar(20) default "not evaluated"
-- );

CREATE TABLE student_acad (
    student_id VARCHAR(12) NOT NULL,
    st_subject VARCHAR(50) NOT NULL,
    st_semester INT NOT NULL,
    st_attendance DECIMAL(5,2) DEFAULT 0.00,
    st_grades VARCHAR(20) DEFAULT 'not evaluated',
    midsem_marks INT DEFAULT 0,
    endsem_marks INT DEFAULT 0,
    TA INT DEFAULT 0,
    lab INT DEFAULT 0,
    section char,
    PRIMARY KEY (student_id, st_subject),
    FOREIGN KEY (student_id) REFERENCES students(student_id)
        ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;