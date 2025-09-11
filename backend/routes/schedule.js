
const express = require("express");
const db = require("../db");
const router = express.Router();

// GET schedule for a specific batch, branch, and section
router.get("/schedule", (req, res) => {
    const { batch, branch, section } = req.query;

    if (!batch || !section) {
        return res.status(400).json({ error: "Missing batch or section" });
    }

    const query = `
        SELECT * FROM schedule
        WHERE batch = ? AND section = ? ${branch ? "AND branch = ?" : ""}
    `;

    const params = branch ? [batch, section, branch] : [batch, section];

    db.query(query, params, (err, results) => {
        if (err) {
            console.error("Error fetching schedule:", err);
            return res.status(500).json({ error: "Failed to fetch schedule" });
        }

        // Transform data into Timetable format for frontend
        const timetable = {};
        results.forEach((row) => {
            if (!timetable[row.day_name]) timetable[row.day_name] = {};
            timetable[row.day_name][convertTo12Hour(row.time_slot)] = {
                subject: row.subject_id || "",
                teacher: row.fac_id || "",
            };
        });

        res.json({ success: true, timetable });
    });
});

// POST insert or update schedule
router.post("/schedule", (req, res) => {
    const { batch, branch, section, timetable } = req.body;

    if (!batch || !section || !timetable) {
        return res.status(500).json({ error: "Missing batch, section, or timetable" });
    }

    const queries = [];
    const values = [];

    for (const day in timetable) {
        for (const time in timetable[day]) {
            const slot = timetable[day][time];
            const subject_id = slot.subject || null;
            const fac_id = slot.teacher || null;

            // Skip empty slots
            if (!subject_id && !fac_id) continue;

            queries.push(`(?, ?, ?, ?, ?, ?, ?)`);
            values.push(batch, branch, section, fac_id, day, convertTo24Hour(time), subject_id);
        }
    }

    if (queries.length === 0) {
        return res.status(400).json({ error: "No timetable data to save" });
    }

    const sql = `
        INSERT INTO schedule (batch, branch, section, fac_id, day_name, time_slot, subject_id)
        VALUES ${queries.join(", ")}
        ON DUPLICATE KEY UPDATE
        fac_id = VALUES(fac_id),
        subject_id = VALUES(subject_id)
    `;

    db.query(sql, values, (err, result) => {
        if (err) {
            console.error("Error saving schedule:", err);
            return res.status(500).json({ error: "Failed to save schedule" });
        }
        res.json({ success: true, message: "Timetable saved successfully" });
    });
});

// Convert "8:00 AM - 9:00 AM" to MySQL TIME format "08:00:00"
function convertTo24Hour(slot) {
    const [start] = slot.split(" - ");
    const [time, modifier] = start.split(" ");
    let [hours, minutes] = time.split(":").map(Number);

    if (modifier === "PM" && hours < 12) hours += 12;
    if (modifier === "AM" && hours === 12) hours = 0;

    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:00`;
}

// Convert MySQL TIME to "8:00 AM - 9:00 AM" format for frontend
function convertTo12Hour(time) {
    const [hours, minutes] = time.split(":").map(Number);
    let period = hours >= 12 ? "PM" : "AM";
    let hour12 = hours % 12 || 12;
    let nextHour = (hours + 1) % 24;
    let nextPeriod = nextHour >= 12 ? "PM" : "AM";
    let nextHour12 = nextHour % 12 || 12;
    return `${hour12}:${String(minutes).padStart(2, "0")} ${period} - ${nextHour12}:${String(minutes).padStart(2, "0")} ${nextPeriod}`;
}

module.exports = router;
