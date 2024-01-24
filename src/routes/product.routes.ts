import express from 'express';
import { getProducts } from '../controllers/product/product.controller.get';
import { addProduct } from '../controllers/product/product.controller.post';
import { getProductById } from '../controllers/product/product.controller.getById';
import { updateProduct } from '../controllers/product/product.controller.put';
import { deleteProduct } from '../controllers/product/product.controller.delete';

const router = express.Router();

router.get('/', getProducts);
router.get('/:id', getProductById);
router.post('/', addProduct);
router.put('/:id', updateProduct);
router.delete('/:id', deleteProduct);

export const productRouter = router;
