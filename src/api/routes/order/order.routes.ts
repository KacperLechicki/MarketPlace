import express from 'express';
import { getOrders } from '../../controllers/order/order.controller.get';
import { addOrder } from '../../controllers/order/order.controller.post';
import { AdminGuard } from '../../../auth/jwt/jwt.auth';

const router = express.Router();

router.get('/', AdminGuard(), getOrders);
router.post('/', addOrder);

export const orderRouter = router;
