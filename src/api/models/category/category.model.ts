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
		minLength: 7,
		maxLength: 7,
		validate: {
			// Validator function to check if the value is a valid HEX color code
			validator: function (v: string): boolean {
				// Regular expression for a HEX color code
				const hexColorCodeRegex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
				// Test the value against the regular expression
				return hexColorCodeRegex.test(v);
			},
			// Message to return if the validation fails
			message: (): string => `Color should be a valid HEX color code.`,
		},
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
