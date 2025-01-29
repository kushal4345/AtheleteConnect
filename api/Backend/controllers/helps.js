const validate = require("validator");

const validation = (req) => {
    const { password, confirmPassword, email } = req.body;

    if (!validate.isEmail(email)) {
        throw new Error("Email is not valid");
    }


    if (
        !validate.isStrongPassword(password, {
            minLength: 8,
            minLowercase: 1,
            minUppercase: 1,
            minNumbers: 1,
            minSymbols: 1,
        })
    ) {
        throw new Error("Password is not strong");
    }
};

function allowedchanges(updates) {
    const allowedUpdates = [
        'firstName',        
        'lastName',        
        'email',            
        'password',        
        'profilePicture',   
        'headline',        
        'location',       
        'about',            
        'experience',       
        'education',        
        'skills',          
        'contactInfo',      
      ]; 
    return Object.keys(updates).every((update) => allowedUpdates.includes(update));
}

module.exports = {
    validation,
    allowedchanges}
