const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require('bcryptjs');
const app = express();
app.use(express.json());

const secretkey = "ghdstylwkgf34656232hyd"; 
const users = [];
app.get("/",(req, resp)=>{
    resp.json({
        message: "a sample api"
    })
});

app.post("/signup", async (req, res) => {
    try {
        const { id, username, email, password } = req.body;

        if (!id || !username || !email || !password) {
            return res.status(400).json({ error: "All fields are required" });
        }

        // Check if user already exists
        const existingUser = users.find(u => u.email === email);
        if (existingUser) {
            return res.status(409).json({ error: "User already exists" });
        }

        // // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);
        console.log("Hassed password",hashedPassword);

        // Save user
        const user = { id, username, email, password: hashedPassword };
        users.push(user);

        // Generate JWT
        const token = jwt.sign({ id, username, email }, secretkey, { expiresIn: "1h" });

        res.status(201).json({ message: "Signup successful: ", token });
        // res.status(201).json({ message: "Hased Password: ", hashedPassword });
    } catch (e) {
        console.error("Signup failed", e);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

app.post("/login",(req,resp)=>{
    try{
        // const {username , password} = req.body;
        const user={
            id:1,
            username:"shivansh",
            email:"shivansh@gmail.com"
        }
        const token = jwt.sign({user},secretkey,{expiresIn:'200s'},()=>{
            resp.json({
                token
            })
            // console.log("hello");
        })
    }catch(e){
        console.log("error occurs in sign in",e);
    }
});

app.listen(5000,()=>{
    console.log("app is running on port 5000");
})