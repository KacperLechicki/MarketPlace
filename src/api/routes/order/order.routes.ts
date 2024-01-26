import express from 'express';
import { getOrders } from '../../controllers/order/order.controller.get';
import { addOrder } from '../../controllers/order/order.controller.post';

const router = express.Router();

router.get('/', getOrders);
router.post('/', addOrder);

export const orderRouter = router;
