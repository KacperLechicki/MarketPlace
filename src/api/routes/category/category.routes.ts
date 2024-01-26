import express from 'express';
import { getCategories } from '../../controllers/category/category.controller.get';
import { getCategoryById } from '../../controllers/category/category.controller.getById';
import { addCategory } from '../../controllers/category/category.controller.post';
import { updateCategory } from '../../controllers/category/category.controller.put';
import { deleteCategory } from '../../controllers/category/category.controller.delete';
import { getCategoriesCount } from '../../controllers/category/category.controller.getCount';
import { AdminGuard } from '../../../auth/jwt/jwt.auth';

const router = express.Router();

router.get('/', getCategories);
router.get('/:id', getCategoryById);
router.post('/', AdminGuard(), addCategory);
router.put('/:id', AdminGuard(), updateCategory);
router.delete('/:id', AdminGuard(), deleteCategory);

router.get('/statistics/count', getCategoriesCount);

export const categoryRouter = router;
