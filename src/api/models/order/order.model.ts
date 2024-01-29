import mongoose from 'mongoose';
import { OrderItem } from './order-item.model';
import { User } from '../user/user.model';
import { OrderStatus } from '../../interfaces/order-status/order-status.interface';
import { Messages } from '../../functions/messages.function';
import { MessageContext } from '../../interfaces/message-context/message-context.interface';

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
				message: Messages(MessageContext.NOT_EXIST, 'OrderItem'),
			},
		},
	],
	street: {
		type: String,
		required: true,
	},
	apartment: {
		type: String,
		required: true,
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
		enum: Object.values(OrderStatus), // Ensure the status is one of the values in OrderStatus
		required: true,
		default: OrderStatus.PENDING,
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
			message: Messages(MessageContext.NOT_EXIST, 'User'),
		},
	},
	dateOrdered: {
		type: Date,
		default: Date.now,
	},
});

orderSchema.virtual('id').get(function (): string {
	return this._id.toHexString();
});

orderSchema.set('toJSON', {
	virtuals: true,
});

export const orderListAttributes =
	'orderItems user dateOrdered totalPrice status';
export const orderDetailsAttributes =
	'orderItems street apartment city zip country phone status totalPrice user dateOrdered';

export const Order = mongoose.model('Order', orderSchema);
