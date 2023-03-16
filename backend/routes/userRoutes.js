import express from 'express';
import asyncHandler from 'express-async-handler'
const router = express.Router();
import User from '../models/userModel.js';
import { authUser, getUserProfile, registerUser, updateUserProfile, getUserById, getUsers, deleteUser, updateUser } from '../controllers/userController.js';
import { protect, admin } from '../middleware/authMiddleware.js';


router.route('/').post(registerUser).get(protect, admin, getUsers)

//get all products
router.post('/login', authUser)

router.route('/profile').get(protect, getUserProfile).put(protect, updateUserProfile)

router
    .route('/:id')
    .delete(protect, admin, deleteUser)
    .get(protect, admin, getUserById)
    .put(protect, admin, updateUser)
export default router