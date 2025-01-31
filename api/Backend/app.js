const express = require('express');
const app = express();
const cors = require('cors');
const data = require('../api/Database/database.js');
const authentication = require('./routers/auth.js');
const profile = require('./routers/profile.js');
authentication.use(express.json());
app.use(cors());
app.use('/', authentication); 
app.use('/',profile)

const databaseConnection = async () => {
    try {
        await data();  
        app.listen(3000, () => {
            console.log('Server is running on port 3000');
        });
    } catch (error) {
        console.error("Error connecting to the database:", error);
    }
};

databaseConnection();

module.exports = app;