const express = require("express");
const db = require("../db.js"); 

const router = express.Router();


// // Get all faculty from database 
router.get("/faculty", (req, res) => {
  db.query(
    "SELECT fac_name, fac_email, fac_contact, fac_id, fac_department FROM faculty",
    (err, results) => {
      if (err) {
        console.error("Error fetching faculty:", err);
        return res.status(500).json({ error: "Database error" });
      }
      //console.log("Faculty fetched:", results);
      res.status(200).json(results); //  send array directly
    }
  );
});



router.get("/faculty/:fac_id", (req, res) => {
  const { fac_id } = req.params;

  if (!fac_id) return res.status(400).json({ error: "Faculty ID required" });

  const query = `
    SELECT f.fac_id, f.fac_name, f.fac_email, f.fac_department,
           COUNT(DISTINCT s.subject_id) AS total_courses
    FROM faculty f
    LEFT JOIN schedule s ON f.fac_id = s.fac_id
    WHERE f.fac_id = ?
    GROUP BY f.fac_id
  `;

  db.query(query, [fac_id], (err, results) => {
    if (err) {
      console.error("Error fetching faculty info:", err);
      return res.status(500).json({ error: "Database error" });
    }

    if (results.length === 0) {
      return res.status(404).json({ error: "Faculty not found" });
    }

    res.json({ success: true, faculty: results[0] });
  });
});


router.get("/faculty/:fac_id/courses", (req, res) => {
  const { fac_id } = req.params;

  const query = `
    SELECT 
      s.subject_id, 
      c.course_name,
      s.batch, 
      s.section, 
      s.day_name, 
      s.time_slot,
      COALESCE(COUNT(sa.student_id), 0) AS total_students
    FROM schedule s
    LEFT JOIN courses c ON s.subject_id = c.course_id
    LEFT JOIN student_acad sa 
      ON sa.course_id = s.subject_id
      AND sa.student_id IS NOT NULL
    WHERE s.fac_id = ?
    GROUP BY s.subject_id, c.course_name, s.batch, s.section, s.day_name, s.time_slot
    ORDER BY s.day_name, s.time_slot
  `;

  db.query(query, [fac_id], (err, results) => {
    if (err) {
      console.error("Error fetching faculty courses:", err);
      return res.status(500).json({ error: "Database error" });
    }

    res.json({ success: true, courses: results });
  });
});



module.exports = router;
