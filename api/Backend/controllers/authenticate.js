const jwt = require('jsonwebtoken');

const authenticate = async (req, res, next) => {
    try {
        console.log("Cookies received in request:", req.cookies); 
        const token = req.cookies.token;
        
        if (!token) {
            console.log("Token missing in cookies");
            return res.status(401).send("Unauthorized: Token missing");
        }

        console.log("Token received in middleware:", token);

        const decoded = jwt.verify(token, "kushal@126"); 
        console.log("Decoded Token:", decoded); 

        req.user = decoded; 
        next(); 
    } catch (error) {
        console.error("JWT Verification Error:", error.message); 
        return res.status(401).send("Unauthorized: Invalid or expired token");
    }
};

module.exports = authenticate;
