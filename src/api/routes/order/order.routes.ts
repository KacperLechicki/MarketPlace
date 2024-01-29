import express from 'express';
import { getOrders } from '../../controllers/order/order.controller.get';
import { addOrder } from '../../controllers/order/order.controller.post';
import { AdminGuard, UserGuard } from '../../../auth/jwt/jwt.auth';
import { getOrderById } from '../../controllers/order/order.controller.getById';
import { orderStatus } from '../../controllers/order/order.controller.status';

// Create a new router object
const router = express.Router();

// Route for getting all orders
// Only admin users can access this route
router.get('/', AdminGuard(), getOrders);

// Route for getting order details
// Any authenticated user can access this route
router.get('/:id', UserGuard(), getOrderById);

// Route for changing order status
// Only admin users can access this route
router.put('/:id', AdminGuard(), orderStatus);

// Route for adding a new order
// Any authenticated user can access this route
router.post('/', UserGuard(), addOrder);

// Export the router
export const orderRouter = router;
