import mongoose from 'mongoose';
import { Product } from '../product/product.model';
import { Messages } from '../../functions/messages.function';
import { MessageContext } from '../../interfaces/message-context/message-context.interface';

const orderItemSchema = new mongoose.Schema({
	quantity: {
		type: Number,
		required: true,
	},
	product: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Product',
		validate: {
			validator: async function (productId: string): Promise<boolean> {
				const product = await Product.findById(productId);
				return !!product;
			},
			message: Messages(MessageContext.NOT_EXIST, 'Product'),
		},
	},
});

orderItemSchema.virtual('id').get(function (): string {
	return this._id.toHexString();
});

orderItemSchema.set('toJSON', {
	virtuals: true,
});

export const OrderItem = mongoose.model('OrderItem', orderItemSchema);
