import express from 'express';
import { getProducts } from '../../controllers/product/product.controller.get';
import { addProduct } from '../../controllers/product/product.controller.post';
import { getProductById } from '../../controllers/product/product.controller.getById';
import { updateProduct } from '../../controllers/product/product.controller.put';
import { deleteProduct } from '../../controllers/product/product.controller.delete';
import { getProductsCount } from '../../controllers/product/product.controller.getCount';
import { getFeaturedProducts } from '../../controllers/product/product.controller.getFeatured';
import { AdminGuard } from '../../../auth/jwt/jwt.auth';

// Create a new router object
const router = express.Router();

// Route for getting all products
// No authentication is required for this route
router.get('/', getProducts);

// Route for getting a product by ID
// No authentication is required for this route
router.get('/:id', getProductById);

// Route for adding a new product
// Only admin users can access this route
router.post('/', AdminGuard(), addProduct);

// Route for updating a product
// Only admin users can access this route
router.put('/:id', AdminGuard(), updateProduct);

// Route for deleting a product
// Only admin users can access this route
router.delete('/:id', AdminGuard(), deleteProduct);

// Route for getting the count of products
// No authentication is required for this route
router.get('/statistics/count', getProductsCount);

// Route for getting the featured products
// No authentication is required for this route
router.get('/featured/:count', getFeaturedProducts);

// Export the router
export const productRouter = router;
