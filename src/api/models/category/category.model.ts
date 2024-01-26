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
			validator: function (v: string): boolean {
				return /^#/.test(v);
			},
			message: (): string => `Color should start with #`,
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
