const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../Database/schema.js');
const {validation} = require('../controllers/helps.js');
const cors = require('cors');
const jwt  = require('jsonwebtoken');
const parser = require('cookie-parser');



router.use(cors());
router.use(express.json());
router.use(parser());

// Signup Route
router.post('/signup', async function (req, res) {
    try {
        console.log(req.body); 
        validation(req);
        const { firstName,lastName,email, password } = req.body;

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({
            firstName,
            lastName,
            email,
            password: hashedPassword,
        });
        await user.save();
        res.status(201).send({ message:"User created successfully" });
    } catch (error) {
        console.error(error); 
        return res.status(400).send({ message: error.message });
    }
});
router.post('/login', async function (req, res) {
    try {
        console.log(req.body); 
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            throw new Error("User not found");
        }

        const isMatch = await bcrypt.compare(password, user.password);

         
        if (isMatch) {
        const token =  await jwt.sign({_id: user._id },"kushal@126",{expiresIn: "7d"});
        console.log(token);
        res.cookie('token',token , {expiresIn: "7d", httpOnly: false});
        res.status(200).send({ message: "Login successful" });
        }
        else{
            throw new Error("Invalid credentials");
        }
    } catch (error) {
        console.error(error); 
        return res.status(400).send({ message: error.message });
    }
});
router.post('/logout',function(req,res){
    res.clearCookie('token').status(200).send({message: "Logged out successfully"});
});


module.exports = router;