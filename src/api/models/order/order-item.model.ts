import mongoose from 'mongoose';

const orderItemSchema = new mongoose.Schema({
	quantity: {
		type: Number,
		required: true,
	},
	product: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Product',
	},
});

orderItemSchema.virtual('id').get(function (): string {
	return this._id.toHexString();
});

orderItemSchema.set('toJSON', {
	virtuals: true,
});

export const OrderItem = mongoose.model('OrderItem', orderItemSchema);
