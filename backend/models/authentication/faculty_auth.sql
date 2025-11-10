create table faculty(
    fac_name varchar(50),
    fac_email varchar(50),
    fac_contact varchar(10),
    fac_id varchar(30) unique primary key,
    fac_password varchar(255) not null,
    fac_department varchar(20)
);