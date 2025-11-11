const express = require("express");
const router = express.Router();
const db = require("../db");

// GET /api/courses/allowed/:sem/:branch
router.get("/courses/allowed/:sem/:branch", (req, res) => {
  const { sem, branch } = req.params;

  const sql = `
    SELECT * FROM courses
    WHERE (allowed_sem1 = ? OR allowed_sem2 = ?)
      AND (allowed_branch1 = ? OR allowed_branch2 = ?)
  `;

  db.query(sql, [sem, sem, branch, branch], (err, results) => {
    if (err) return res.status(500).json({ success: false, error: err });

    return res.json({ success: true, courses: results });
  });
});

module.exports = router;
