const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const cors = require("cors");
const mysql = require("mysql2");
const db = require("./db");
require("dotenv").config();
const facultyRoutes = require("./routes/faculty.js");
const studentsRoutes = require("./routes/students.js");
const studentcountRoutes = require("./routes/studentcout.js");
const PASSWORD = process.env.ADMIN_PASSWORD;
const MAIL = process.env.ADMIN_EMAIL;
const app = express();

app.use(cors({
    origin: 'http://localhost:8080',  
    credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", facultyRoutes);
app.use("/api",studentsRoutes);
app.use("/api",studentcountRoutes);
// ------------------- SIGNUP -------------------

app.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required" });
        }
        // Check if email already exists
        if(email == MAIL){
            const isMatch = await bcrypt.compare(password,PASSWORD);
            if(isMatch){
                res.json({ message: "Signup successful" });
            }
        }
        
    } catch (e) {
        console.error(" Signup Error:", e);
        res.status(500).json({ message: "Server error" });
    }
});

app.post('/add_faculty',async (req, res) =>{
    const {name, email, phone, id, password, department} = req.body;
    const hashedpassword = await bcrypt.hash(password,10);
    const sql = `
    INSERT INTO faculty (fac_name, fac_email, fac_contact, fac_id, fac_password, fac_department)  VALUES 
    (?,?,?,?,?,?)`;
    db.query(sql,[name, email, phone, id, hashedpassword, department],(err,result) =>{
        if(err){
            console.log('error occur while adding data, error:  ',{err});
            return res.status(500).json({error : 'database error'});
        }
        return res.status(201).json({message: "faculty added successfully",insertId: result.insertId});
    });
});

app.post('/add_student',async(req,res) =>{
    const{name, email, phone, branch, id, password} = req.body;
    const hashedpassword = await bcrypt.hash(password,10);
    console.log("Original:", password);
    console.log("Hashed:", hashedpassword);
    const sql = `
    INSERT INTO students (student_name, student_email, student_contact, student_branch, 
    student_id, student_password) values (?,?,?,?,?,?)`;
    console.log('data received in backend');
    db.query(sql,[name, email, phone, branch, id, hashedpassword],(err,result) =>{
        if(err){
            console.log('error occur while adding students data, error: ',{err});
            return res.status(500).json({error : 'database error'});
        }
        return res.status(201).json({message: "student added successfully ", insertId: result.insertId});
    });
});

// ----------- student login -----------------
app.post("/student/login", (req, res) => {
    const { studentId, password } = req.body;

    if (!studentId || !password) {
        return res.status(400).json({ message: "Student ID/Email and password are required" });
    }

    // Search by student_id or student_email
    const sql = `
        SELECT * FROM students 
        WHERE student_id = ? OR student_email = ?
    `;

    db.query(sql, [studentId, studentId], async (err, results) => {
        if (err) {
            console.error("Database error during login:", err);
            return res.status(500).json({ message: "Database error" });
        }

        if (results.length === 0) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const student = results[0];

        // Compare entered password with hashed password in DB
        const isMatch = await bcrypt.compare(password, student.student_password);

        if (!isMatch) {
            return res.status(401).json({ message: "Invalid credentials" });
        }
        res.json({
            success: true,
            message: "Login successful",
            student: {
                id: student.student_id,
                name: student.student_name,
                email: student.student_email
            }
        });
    });
});


app.listen(5000, () => {
    console.log(" Server running on http://localhost:5000");
});


// const express = require("express");
// const jwt = require("jsonwebtoken");
// const bcrypt = require("bcryptjs");
// const cors = require("cors");
// require("dotenv").config();

// const db = require("./db");
// const facultyRoutes = require("./routes/faculty");

// const app = express();

// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use(cors({
//     origin: 'http://localhost:8080',
//     credentials: true
// }));

// // Mount faculty routes
// app.use("/api", facultyRoutes);

// const PASSWORD = process.env.ADMIN_PASSWORD;
// const MAIL = process.env.ADMIN_EMAIL;

// // ------------------- ADMIN LOGIN -------------------
// app.post("/login", async (req, res) => {
//     try {
//         const { email, password } = req.body;

//         if (!email || !password) {
//             return res.status(400).json({ message: "Email and password are required" });
//         }

//         if (email === MAIL) {
//             // If PASSWORD in .env is HASHED with bcrypt
//             const isMatch = await bcrypt.compare(password, PASSWORD);

//             if (isMatch) {
//                 return res.json({ message: "Login successful" });
//             } else {
//                 return res.status(401).json({ message: "Invalid credentials" });
//             }
//         } else {
//             return res.status(401).json({ message: "Invalid credentials" });
//         }
//     } catch (e) {
//         console.error("Login Error:", e);
//         res.status(500).json({ message: "Server error" });
//     }
// });

// // ------------------- ADD FACULTY -------------------
// app.post("/add_faculty", async (req, res) => {
//     const { name, email, phone, id, password, department } = req.body;
//     const hashedpassword = await bcrypt.hash(password, 10);

//     const sql = `
//         INSERT INTO faculty (fac_name, fac_email, fac_contact, fac_id, fac_password, fac_department)  
//         VALUES (?, ?, ?, ?, ?, ?)
//     `;

//     db.query(sql, [name, email, phone, id, hashedpassword, department], (err, result) => {
//         if (err) {
//             console.log("Error while adding faculty:", err);
//             return res.status(500).json({ error: "Database error" });
//         }
//         return res.status(201).json({ message: "Faculty added successfully", insertId: result.insertId });
//     });
// });

// // ------------------- ADD STUDENT -------------------
// app.post("/add_student", async (req, res) => {
//     const { name, email, phone, branch, id, password } = req.body;
//     const hashedpassword = await bcrypt.hash(password, 10);

//     const sql = `
//         INSERT INTO students (student_name, student_email, student_contact, student_branch, student_id, student_password) 
//         VALUES (?, ?, ?, ?, ?, ?)
//     `;

//     db.query(sql, [name, email, phone, branch, id, hashedpassword], (err, result) => {
//         if (err) {
//             console.log("Error while adding student:", err);
//             return res.status(500).json({ error: "Database error" });
//         }
//         return res.status(201).json({ message: "Student added successfully", insertId: result.insertId });
//     });
// });

// // ------------------- STUDENT LOGIN -------------------
// app.post("/student/login", (req, res) => {
//     const { studentId, password } = req.body;

//     if (!studentId || !password) {
//         return res.status(400).json({ message: "Student ID/Email and password are required" });
//     }

//     const sql = `
//         SELECT * FROM students 
//         WHERE student_id = ? OR student_email = ?
//     `;

//     db.query(sql, [studentId, studentId], async (err, results) => {
//         if (err) {
//             console.error("Database error during login:", err);
//             return res.status(500).json({ message: "Database error" });
//         }

//         if (results.length === 0) {
//             return res.status(401).json({ message: "Invalid credentials" });
//         }

//         const student = results[0];
//         const isMatch = await bcrypt.compare(password, student.student_password);

//         if (!isMatch) {
//             return res.status(401).json({ message: "Invalid credentials" });
//         }

//         res.json({
//             success: true,
//             message: "Login successful",
//             student: {
//                 id: student.student_id,
//                 name: student.student_name,
//                 email: student.student_email
//             }
//         });
//     });
// });

// // ------------------- START SERVER -------------------
// app.listen(5000, () => {
//     console.log("Server running on http://localhost:5000");
// });
