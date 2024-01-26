import mongoose from 'mongoose';

export interface OrderItemInterface {
	quantity: number;
	product: mongoose.Schema.Types.ObjectId;
}
