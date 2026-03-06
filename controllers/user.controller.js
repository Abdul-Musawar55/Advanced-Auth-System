const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const {generateAccessToken, generateRefreshToken} = require("../utils/generateToken")

const generationToken = (id, email) => { return jwt.sign(
    {id, email},
    process.env.JWT_SECRET,
    {expiresIn: "7d"}
)}

exports.signup = async(req, res)=>{
    try {
        const {fullName, email, password} = req.body;

        if(!fullName || !email || !password){
            return res.status(400).send({isSuccess: false, message: "All fields are required!"});
        }

        const exist = await User.findOne({email})

        if(exist){
            return res.status(400).send({isSuccess: false, message: "Email already exist"})
        }

        const hashPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            fullName,
            email,
            password: hashPassword
        });

        const token = generationToken(user._id, user.email)

        // req.user = decoded;
        res.status(200).send({isSuccess: true, message: "Signup successfully", token, user })
    } catch (error) {
        res.status(500).send({isSuccess: false, message: "Signup failed!", error: error.message})
    }
}

exports.login = async(req, res)=>{
    try {
        const {email, password} = req.body;

        const user = await User.findOne({email})

        if(!user){
            return res.status(400).send({isSuccess: false, message: "Invalid Email"})
        }

        const isMatch = await bcrypt.compare(password, user.password);
        
        if(!isMatch){
            return res.status(400).send({isSuccess: false, message: "Invalid credentail"})
        }

        const accessToken = generateAccessToken(user);
        const refreshToken = generateRefreshToken(user);

        res.status(200).send({isSuccess: true, message: "Login Successfully!", accessToken, refreshToken})

    } catch (error) {
        res.status(500).send({isSuccess: false, message: "Login failed!", error: error.message})
    }
}

exports.refreshToken = (req, res)=>{

    const {refreshToken} = req.body;

    if(!refreshToken){
        return res.status(401).send({isSuccess: false, message: "Refresh Token Required!"})
    }
    try {
        const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET)

        const accessToken = jwt.sign(
            {id: decoded.id},
            process.env.JWT_SECRET,
            {expiresIn: "15m"}
        )

        res.send({accessToken})
    } catch (error) {
        res.status(403).send({message: "Invalid Refresh Token"})
    }
}


    
