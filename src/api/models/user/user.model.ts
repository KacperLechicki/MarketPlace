import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
	// User's name
	name: {
		type: String,
		required: true,
	},
	// User's email
	email: {
		type: String,
		required: true,
		unique: true,
		validate: {
			validator: function (v: string): boolean {
				// Simple regex to validate email
				return /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(v);
			},
			message: (props: { value: string }): string =>
				`${props.value} is not a valid email.`,
		},
	},
	// User's password
	password: {
		type: String,
		required: true,
		minLength: 8,
		immutable: true,
	},
	// User's phone number
	phone: {
		type: String,
		default: '',
	},
	// Flag to indicate if the user is an admin
	isAdmin: {
		type: Boolean,
		default: false,
		immutable: true,
	},
	// User's address
	address: {
		street: {
			type: String,
			default: '',
		},
		apartment: {
			type: String,
		},
		city: {
			type: String,
			default: '',
		},
		zip: {
			type: String,
			default: '',
		},
		country: {
			type: String,
			default: '',
		},
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
