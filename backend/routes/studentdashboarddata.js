const express = require("express");
const router = express.Router();
const db = require("./db"); 

// Route: POST /student/dashboard-data
router.post("/dashboard-data", async (req, res) => {
  try {
    const { identifier } = req.body; 
    if (!identifier) {
      return res.status(400).json({ success: false, message: "Student ID or Email is required" });
    }

    // Step 1: Resolve identifier → student_id
    const [studentRow] = await db.query(
      "SELECT student_id FROM students WHERE student_id = ? OR student_email = ? LIMIT 1",
      [identifier, identifier]
    );

    if (studentRow.length === 0) {
      return res.status(404).json({ success: false, message: "Student not found" });
    }

    const studentId = studentRow[0].student_id;

    // Step 2: Fetch subjects from student_acad
    const [subjects] = await db.query(
      "SELECT st_subject FROM student_acad WHERE student_id = ?",
      [studentId]
    );

    return res.json({ success: true, studentId, subjects });
  } catch (error) {
    console.error("Error fetching dashboard data:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
});

module.exports = router;
