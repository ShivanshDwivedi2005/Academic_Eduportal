CREATE TABLE IF NOT EXISTS courses (
    course_id VARCHAR(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci PRIMARY KEY,
    course_name VARCHAR(50) DEFAULT 'not specified',
    credits INT DEFAULT 0,
    allowed_sem1 INT DEFAULT 0,
    allowed_sem2 INT DEFAULT 0,
    allowed_branch1 VARCHAR(2) DEFAULT 'NA',
    allowed_branch2 VARCHAR(2) DEFAULT 'NA',
    batch int default 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
