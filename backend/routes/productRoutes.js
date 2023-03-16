import express from 'express';
const router = express.Router();
import Product from '../models/productModel.js';
import { getProducts, getProductById, deleteProduct, createProduct, updateProduct } from '../controllers/productController.js';
import { protect, admin } from '../middleware/authMiddleware.js';


//get all products
router.route('/').get(getProducts).post(protect, admin, createProduct)

//get product by id
router.route('/:id').get(getProductById).put(protect, admin, updateProduct).delete(protect, admin, deleteProduct)

export default router