const express = require("express");
const db = require("../db");
const router = express.Router();

// ----------------------------------------------
// GET: Fetch students + their academic records
// ----------------------------------------------
router.get("/faculty/:fac_id/manage/:subject_id/:batch/:section", (req, res) => {
  const { subject_id } = req.params;

  const sql = `
    SELECT 
      s.student_id,
      s.student_name,
      a.midsem_marks,
      a.endsem_marks,
      a.TA,
      a.lab,
      a.st_grades
    FROM student_acad a
    JOIN students s
      ON a.student_id = s.student_id
    WHERE a.course_id = ?
    ORDER BY s.student_id
  `;

  db.query(sql, [subject_id], (err, results) => {
    if (err) return res.status(500).json({ success: false, error: err });
    return res.json({ success: true, students: results });
  });
});


// ----------------------------------------------
// PUT: Insert or update academic record
// ----------------------------------------------
router.put("/faculty/update-acad", (req, res) => {
  const { student_id, course_id, midsem, endsem, ta, lab, grade } = req.body;

  // Insert if not exists, update if exists
  const sql = `
    INSERT INTO student_acad 
      (student_id, course_id, midsem_marks, endsem_marks, TA, lab, st_grades)
    VALUES (?, ?, ?, ?, ?, ?, ?)
    ON DUPLICATE KEY UPDATE
      midsem_marks = VALUES(midsem_marks),
      endsem_marks = VALUES(endsem_marks),
      TA = VALUES(TA),
      lab = VALUES(lab),
      st_grades = VALUES(st_grades)
  `;

  db.query(
    sql,
    [student_id, course_id, midsem, endsem, ta, lab, grade],
    (err, results) => {
      if (err) {
        return res.status(500).json({ success: false, error: err });
      }
      return res.json({ success: true });
    }
  );
});

module.exports = router;
