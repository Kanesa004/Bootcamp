// routes/userRoutes.js
const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

router.post('/register', userController.register);
router.post('/login', userController.login);
router.get('/:id', userController.getUserById);           
router.put('/:id', userController.updateUser);            
router.patch('/:id/status', userController.setUserStatus); 
router.delete('/:id', userController.softDeleteUser);

module.exports = router;
