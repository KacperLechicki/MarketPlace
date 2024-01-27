import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
		unique: true,
	},
	password: {
		type: String,
		required: true,
	},
	phone: {
		type: String,
		default: '',
	},
	isAdmin: {
		type: Boolean,
		default: false,
		immutable: true,
	},
	address: {
		street: {
			type: String,
			default: '',
		},
		apartment: {
			type: String,
			default: '',
		},
		zipcode: {
			type: String,
			default: '',
		},
		city: {
			type: String,
			default: '',
		},
		country: {
			type: String,
			default: '',
		}
	},
	dateCreated: {
		type: Date,
		default: Date.now,
	},
});

userSchema.virtual('id').get(function (): string {
	return this._id.toHexString();
});

userSchema.set('toJSON', {
	virtuals: true,
});

export const userListAttributes = 'name email isAdmin dateCreated';
export const userDetailsAttributes =
	'name email phone isAdmin address dateCreated';

export const User = mongoose.model('User', userSchema);
