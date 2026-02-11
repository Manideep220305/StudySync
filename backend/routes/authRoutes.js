const express = require('express');
const router = express.Router();

// Import the controller functions we just wrote
const { 
    registerUser, 
    loginUser, 
    logoutUser 
} = require('../controllers/authController');

// Define the routes
// The full path will be: http://localhost:5000/api/users/register
router.post('/register', registerUser);

// The full path will be: http://localhost:5000/api/users/login
router.post('/login', loginUser);

// The full path will be: http://localhost:5000/api/users/logout
router.post('/logout', logoutUser);

module.exports = router;