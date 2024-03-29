import mongoose from 'mongoose';
import { Category } from '../category/category.model';
import { Messages } from '../../functions/messages.function';
import { MessageContext } from '../../interfaces/message-context/message-context.interface';

// Define the product schema
const productSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		unique: true,
	},
	description: {
		type: String,
		required: true,
	},
	longDescription: {
		type: String,
	},
	image: {
		type: String,
		required: true,
	},
	images: [
		{
			type: String,
		},
	],
	brand: {
		type: String,
		required: true,
	},
	price: {
		type: Number,
		required: true,
		default: 0,
		min: 0,
	},
	// Define the category field
	category: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Category',
		required: true,
		validate: {
			// Define a custom validator function
			validator: async function (categoryId: string): Promise<boolean> {
				// Try to find a category with the given ID
				const category = await Category.findById(categoryId);
				// If a category was found, the validation is successful
				// If not, the validation fails
				return !!category;
			},
			// Define the error message for failed validation
			message: Messages(MessageContext.NOT_EXIST, 'Category'),
		},
	},
	// Define the stock field
	stock: {
		type: Number,
		required: true,
		default: 0,
		min: 0,
		max: 999,
	},
	// Define the rating field
	rating: {
		type: Number,
		default: 0,
		min: 0,
		max: 10,
	},
	// Define the reviews field
	reviews: {
		type: Number,
		default: 0,
		min: 0,
	},
	// Define the isFeatured field
	isFeatured: {
		type: Boolean,
		default: false,
		required: true,
	},
});

// Define a virtual property 'id' that gets the hexadecimal string representation of the MongoDB ObjectId
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
