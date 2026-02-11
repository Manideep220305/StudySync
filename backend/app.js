const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');

const app=express();
//Middleware
app.use(cors({
  origin: 'http://localhost:5173', // Vite dev server frontend URL
  credentials: true, // Allow cookies
}));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());

//Routes
app.use('/api/users',authRoutes);
//a route for checking
app.use('/',(req,res)=>{
    res.send('StudySync api is running');
});

module.exports=app;