const express = require("express");
const db = require("../db.js");
const router = express.Router();
router.get("/students-data",(req,res)=>{
    db.query(
        "select student_name, student_id, student_branch, student_email, student_contact from students",
        (err,results)=>{
            if(err){
                console.error("Error fetching students detail: ",err);
                return res.status(500).json({error:"Database error"});
            }
            console.log("student's data fetched: ",results);
            res.status(200).json(results);
        }
    );
});



router.get("/student/:id", (req, res) => {
  const studentId = req.params.id;

  const sql = `
    SELECT 
      s.student_id, 
      s.student_name, 
      s.student_email, 
      s.student_branch,
      a.course_id,
      c.course_name,
      c.credits,
      a.st_semester,
      a.midsem_marks,
      a.endsem_marks,
      a.TA,
      a.lab,
      a.st_grades
    FROM students s
    LEFT JOIN student_acad a ON s.student_id = a.student_id
    LEFT JOIN courses c ON a.course_id = c.course_id
    WHERE s.student_id = ?;
  `;

  db.query(sql, [studentId], (err, result) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json({ message: "Database error" });
    }
    if (result.length === 0)
      return res.status(404).json({ message: "Student not found" });

    res.json({ success: true, studentData: result });
  });
});

module.exports = router;
