const express = require('express');
const jwt = require('jsonwebtoken'); 
const router = express.Router();
const User = require('../Database/schema.js');
const parser = require('cookie-parser');
const authenticate = require('../controllers/authenticate.js');
const {allowedchanges} = require('../controllers/helps.js');

router.use(parser());
router.get('/profile/view', authenticate , async function (req, res) {
    try {
        console.log("User ID from Token:", req.user._id); 
        const user = await User.findById(req.user._id);
        if (!user) {
            return res.status(404).send("User not found");
        }
        res.send(user);
    } catch (error) {
        console.error("Error in /profil/view:", error.message); 
        res.status(500).send("Internal Server Error");
    }
});

router.patch('/profile/edit', authenticate, async function (req, res) {
    try {
        // Validate allowed changes
        if (!allowedchanges(req.body)) {
            return res.status(400).json({ message: 'cannot changes restrict fields' });
        }

    
        const userId = req.user._id;


        const updatedUser = await User.findByIdAndUpdate(userId, req.body, { new: true, runValidators: true });

        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Send the updated user as a response
        res.json(updatedUser);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
router.delete('/profile/delete', authenticate, async function (req, res) {
    try {
        const userId = req.user._id;

        const result = await User.deleteOne({ _id: userId });

        if (result.deletedCount === 0) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({ message: "User deleted successfully" });

    } catch (e) {
        res.status(500).json({ message: e.message });
    }
});



module.exports = router;