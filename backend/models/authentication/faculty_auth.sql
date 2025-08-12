create table faculty(
    faculty_id int primary key,
    fac_name varchar(50),
    fac_email varchar(50),
    fac_contact varchar(10),
    fac_id varchar(30) unique,
    fac_password varchar(50) not null
);
 