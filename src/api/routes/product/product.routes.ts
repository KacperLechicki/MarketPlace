import express from 'express';
import { getProducts } from '../../../controllers/product/product.controller.get';
import { addProduct } from '../../../controllers/product/product.controller.post';
import { getProductById } from '../../../controllers/product/product.controller.getById';
import { updateProduct } from '../../../controllers/product/product.controller.put';
import { deleteProduct } from '../../../controllers/product/product.controller.delete';
import { getProductsCount } from '../../../controllers/product/product.controller.getCount';
import { getFeaturedProducts } from '../../../controllers/product/product.controller.getFeatured';

const router = express.Router();

router.get('/', getProducts);
router.get('/:id', getProductById);
router.post('/', addProduct);
router.put('/:id', updateProduct);
router.delete('/:id', deleteProduct);

router.get('/statistics/count', getProductsCount);
router.get('/featured/:count', getFeaturedProducts);

export const productRouter = router;
