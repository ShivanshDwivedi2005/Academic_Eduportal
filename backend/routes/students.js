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

module.exports = router;