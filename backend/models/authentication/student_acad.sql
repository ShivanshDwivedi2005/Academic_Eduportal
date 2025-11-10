-- create table student_acad(
--     st_name varchar(50),
--     st_Id varchar(12),
--     st_subject varchar(20),
--     st_semester int,
--     st_attendence int,
--     st_grades varchar(20) default "not evaluated"
-- );


CREATE TABLE IF NOT EXISTS student_acad (
    student_id VARCHAR(12) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
    course_id VARCHAR(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
    st_semester INT,
    midsem_marks FLOAT,
    endsem_marks FLOAT,
    TA FLOAT,
    lab FLOAT,
    st_grades VARCHAR(5),
    PRIMARY KEY (student_id, course_id),
    FOREIGN KEY (student_id) REFERENCES students(student_id)
        ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (course_id) REFERENCES courses(course_id)
        ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


