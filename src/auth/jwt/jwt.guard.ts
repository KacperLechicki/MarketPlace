let { expressjwt: jwt } = require('express-jwt');
require('dotenv/config');

const auth = process.env.AUTH_URL || '';

export const JWTGuard = () => {
	const secret = process.env.TOKEN_USER_SEED;
	return jwt({
		secret,
		algorithms: ['HS256'],
	}).unless({ path: [`${auth}/users/login`] });
};
