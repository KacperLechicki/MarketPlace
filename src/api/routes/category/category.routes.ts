import express from 'express';
import { getCategories } from '../../controllers/category/category.controller.get';
import { getCategoryById } from '../../controllers/category/category.controller.getById';
import { addCategory } from '../../controllers/category/category.controller.post';
import { updateCategory } from '../../controllers/category/category.controller.put';
import { deleteCategory } from '../../controllers/category/category.controller.delete';
import { getCategoriesCount } from '../../controllers/category/category.controller.getCount';
import { AdminGuard } from '../../../auth/jwt/jwt.auth';

// Create a new router object
const router = express.Router();

// Route for getting all categories
// No authentication is required for this route
router.get('/', getCategories);

// Route for getting a category by ID
// No authentication is required for this route
router.get('/:id', getCategoryById);

// Route for adding a new category
// Only admin users can access this route
router.post('/', AdminGuard(), addCategory);

// Route for updating a category
// Only admin users can access this route
router.put('/:id', AdminGuard(), updateCategory);

// Route for deleting a category
// Only admin users can access this route
router.delete('/:id', AdminGuard(), deleteCategory);

// Route for getting the count of categories
// No authentication is required for this route
router.get('/statistics/count', getCategoriesCount);

// Export the router
export const categoryRouter = router;
