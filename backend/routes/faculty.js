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

// Get faculty by ID
router.get("/faculty/:id", (req, res) => {
  const { id } = req.params;
  db.query(
    "SELECT * FROM faculty WHERE fac_id = ?",
    [id],
    (err, results) => {
      if (err) {
        console.error("Error fetching faculty:", err);
        return res.status(500).json({ error: "Database error" });
      }
      if (results.length === 0) {
        return res.status(404).json({ error: "Faculty not found" });
      }
      res.json(results[0]);
    }
  );
});

module.exports = router;
