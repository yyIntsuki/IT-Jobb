// Get npm express
var express = require('express');

// Get Express Router object
var router = express.Router();

// Get create controller
var createUser = require('../controllers/login');

// Set up create Route for user
router.post('/create', createUser.create);

// Export
module.exports = router;