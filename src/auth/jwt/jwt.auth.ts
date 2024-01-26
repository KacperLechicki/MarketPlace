import { isAdmin } from './functions/is-admin.function';
import { isOnlyUser } from './functions/is-only-user.function';
import { isUser } from './functions/is-user.function';
require('dotenv/config');

let { expressjwt: jwt } = require('express-jwt');

const secret = process.env.TOKEN_USER_SEED || '';

export const AdminGuard = () => {
	return jwt({
		secret,
		algorithms: ['HS256'],
		isRevoked: isAdmin,
	});
};

export const UserGuard = () => {
	return jwt({
		secret,
		algorithms: ['HS256'],
		isRevoked: isUser,
	});
};

export const OnlyUserGuard = () => {
	return jwt({
		secret,
		algorithms: ['HS256'],
		isRevoked: isOnlyUser,
	});
};
