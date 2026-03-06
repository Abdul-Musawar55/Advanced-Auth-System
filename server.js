require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 5000;

const {protect} = require("./middlewares/user.middleware");
const connectDB = require("./config/db");

connectDB();
app.use(cors("*"));

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use("/api/v1/users", require("./routes/user.route"))

app.get("/secure", protect, (req, res) => {
    res.send({message: "Hello world!"});
})


app.listen(PORT, ()=>{
    console.log(`Server is up on port: ${PORT}`);
})

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5YWE3MThiMTg3OTZiOTNlMDZkNTQzMiIsImVtYWlsIjoic2lya2hhbkBnbWFpbC5jb20iLCJpYXQiOjE3NzI3Nzc4NjgsImV4cCI6MTc3MzM4MjY2OH0.29pw5qOCaZJ74xvPY1Hdc6v2AA-s5If_nRJvxyDX3nQ"

// 69aa718b18796b93e06d5432

// {
//   "isSuccess": true,
//   "message": "Login Successfully!",
//   "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5YWE3MThiMTg3OTZiOTNlMDZkNTQzMiIsImlhdCI6MTc3Mjc3ODMxMCwiZXhwIjoxNzcyNzc5MjEwfQ.gNa_7gjuFwmLcxmveQwQZExgfiEwyIW2JX7WzECZZ5U",
//   "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5YWE3MThiMTg3OTZiOTNlMDZkNTQzMiIsImlhdCI6MTc3Mjc3ODMxMCwiZXhwIjoxNzczMzgzMTEwfQ.zv420nq3oRzOvi_1CU_oC3_S6w7URXQT5XiHwiiEFwE"
// }

// {
//   "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5YWE3MThiMTg3OTZiOTNlMDZkNTQzMiIsImlhdCI6MTc3Mjc3ODY4OCwiZXhwIjoxNzcyNzc5NTg4fQ.9bWQtWBZsa3z0S7lAPz4wi1Gs1yBHi8EK0PBmbkIA_Y"
// }