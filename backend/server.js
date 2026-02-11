//this file is all about connecting to the db , not about express setup or the express router
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = require('./app');

dotenv.config();

//DB connection
const connectDB= async()=>{
    try{
        const conn=await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    }catch(error){
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

//Start Server
//only connnect to DB and start listening here
connectDB().then(()=>{
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, ()=> console.log( `Server is running on port ${PORT}`));
});
