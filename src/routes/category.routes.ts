import express from 'express';
import { getCategories } from '../controllers/category/category.controller.get';
import { getCategoryById } from '../controllers/category/category.controller.getById';
import { addCategory } from '../controllers/category/category.controller.post';
import { updateCategory } from '../controllers/category/category.controller.put';
import { deleteCategory } from '../controllers/category/category.controller.delete';

const router = express.Router();

router.get('/', getCategories);
router.get('/:id', getCategoryById);
router.post('/', addCategory);
router.put('/:id', updateCategory);
router.delete('/:id', deleteCategory);

export const categoryRouter = router;
