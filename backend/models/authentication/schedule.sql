CREATE TABLE schedule (
    batch VARCHAR(4) NOT NULL,
    branch varchar(6),
    section VARCHAR(2) NOT NULL,
    fac_id VARCHAR(30) NOT NULL,
    day_name ENUM('Monday','Tuesday','Wednesday','Thursday','Friday','Saturday') NOT NULL,
    time_slot TIME NOT NULL,
    subject_id varchar(20),
    PRIMARY KEY (batch, section, day_name, time_slot),
    CONSTRAINT fk_schedule_faculty FOREIGN KEY (fac_id)
        REFERENCES faculty(fac_id)
        ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

