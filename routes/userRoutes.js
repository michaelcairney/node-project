const express = require('express');
const router = express.Router();
const { signup, login, verify } = require('../controllers/authController');
const { getAllUsers, deleteUser } = require('../controllers/userController');

// Create user
router.post('/signup', signup);

// Log user in
router.post('/login', login);

// get all users
router.get('/', getAllUsers);

// delete a user
router.delete('/:id', deleteUser);

module.exports = router;
