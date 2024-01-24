import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	icon: {
		type: String,
		required: true,
	},
	color: {
		type: String,
		required: true,
	},
});

categorySchema.virtual('id').get(function (): string {
	return this._id.toHexString();
});

categorySchema.set('toJSON', {
	virtuals: true,
});

export const categoryListAttributes = 'name icon color id';
export const categoryDetailsAttributes = 'name icon color id';

export const Category = mongoose.model('Category', categorySchema);