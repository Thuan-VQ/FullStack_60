const mongoose = require('mongoose');

const connectDB = async () => {
    //connect to DataBase
    try {
        const dbConfig = 'mongodb://localhost/fullstack-ecommerce';
        const connect = await mongoose.connect(dbConfig);
        console.log(`Mongo connected: ${connect.connection.host}`);
    } catch (e) {
        console.log("Error connect to mongoDB");
    }
}

module.exports = connectDB