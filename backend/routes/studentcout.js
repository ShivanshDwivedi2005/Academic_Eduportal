const express = require("express");
const db = require("../db.js");
const router = express.Router();
router.get("/student-count",(req,res)=>{
    db.query(
        "select count(*) as total from students",
        (err,results)=>{
            if(err){
                console.error("error fetching students database : ",err);
                return res.status(500).json({ error: "Database error" });
            }
            console.log("student's data fetched: ",results[0].total);
            res.status(200).json(results[0].total);
        }
    );
});
module.exports = router;