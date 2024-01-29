import mongoose from 'mongoose';

/**
 * Interface for order items.
 */
export interface OrderItemInterface {
	/**
	 * The quantity of the product in the order.
	 */
	quantity: number;

	/**
	 * The ID of the product in the order.
	 */
	product: mongoose.Schema.Types.ObjectId;
}
