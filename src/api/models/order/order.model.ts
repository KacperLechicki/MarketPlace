import mongoose from 'mongoose';
import { OrderItem } from './order-item.model';
import { User } from '../user/user.model';

const orderSchema = new mongoose.Schema({
	orderItems: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'OrderItem',
			required: true,
			validate: {
				validator: async function (orderItemId: string): Promise<boolean> {
					const orderItem = await OrderItem.findById(orderItemId);
					return !!orderItem;
				},
				message: 'OrderItem does not exist.',
			},
		},
	],
	shippingAddress1: {
		type: String,
		required: true,
	},
	shippingAddress2: {
		type: String,
	},
	city: {
		type: String,
		required: true,
	},
	zip: {
		type: String,
		required: true,
	},
	country: {
		type: String,
		required: true,
	},
	phone: {
		type: String,
		required: true,
	},
	status: {
		type: String,
		required: true,
		default: 'Pending',
	},
	totalPrice: {
		type: Number,
	},
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		validate: {
			validator: async function (userId: string): Promise<boolean> {
				const user = await User.findById(userId);
				return !!user;
			},
			message: 'User does not exist.',
		},
	},
	dateOrdered: {
		type: Date,
		default: Date.now,
	},
	canceled: {
		type: Boolean,
		default: false,
	},
});

orderSchema.virtual('id').get(function (): string {
	return this._id.toHexString();
});

orderSchema.set('toJSON', {
	virtuals: true,
});

export const orderListAttributes =
	'orderItems user dateOrdered totalPrice canceled';

export const Order = mongoose.model('Order', orderSchema);
