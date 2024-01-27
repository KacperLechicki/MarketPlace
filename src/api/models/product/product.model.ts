import mongoose from 'mongoose';
import { Category } from '../category/category.model';

const productSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	description: {
		type: String,
		required: true,
	},
	longDescription: {
		type: String,
		default: '',
	},
	image: {
		type: String,
		default: '',
	},
	images: [
		{
			type: String,
			default: '',
		},
	],
	brand: {
		type: String,
		required: true,
		default: '',
	},
	price: {
		type: Number,
		required: true,
		default: 0,
		min: 0.01,
	},
	category: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Category',
		required: true,
		validate: {
			validator: async function (categoryId: string): Promise<boolean> {
				const category = await Category.findById(categoryId);
				return !!category;
			},
			message: 'Category does not exist.',
		},
	},
	stock: {
		type: Number,
		required: true,
		default: 0,
		min: 0,
		max: 999,
	},
	rating: {
		type: Number,
		default: 0,
		min: 0,
		max: 10,
	},
	reviews: {
		type: Number,
		default: 0,
		min: 0,
	},
	isFeatured: {
		type: Boolean,
		default: false,
		required: true,
	},
});

productSchema.virtual('id').get(function (): string {
	return this._id.toHexString();
});

productSchema.set('toJSON', {
	virtuals: true,
});

export const productListAttributes =
	'name description image brand price category stock rating reviews isFeatured';
export const productDetailsAttributes =
	'name description longDescription image images brand price category stock rating reviews isFeatured';

export const Product = mongoose.model('Product', productSchema);
