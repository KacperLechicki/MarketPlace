import express from 'express';
import { getProducts } from '../../controllers/product/product.controller.get';
import { addProduct } from '../../controllers/product/product.controller.post';
import { getProductById } from '../../controllers/product/product.controller.getById';
import { updateProduct } from '../../controllers/product/product.controller.put';
import { deleteProduct } from '../../controllers/product/product.controller.delete';
import { getProductsCount } from '../../controllers/product/product.controller.getCount';
import { getFeaturedProducts } from '../../controllers/product/product.controller.getFeatured';
import { AdminGuard } from '../../../auth/jwt/jwt.auth';

const router = express.Router();

router.get('/', getProducts);
router.get('/:id', getProductById);
router.post('/', AdminGuard(), addProduct);
router.put('/:id', AdminGuard(), updateProduct);
router.delete('/:id', AdminGuard(), deleteProduct);

router.get('/statistics/count', getProductsCount);
router.get('/featured/:count', getFeaturedProducts);

export const productRouter = router;
