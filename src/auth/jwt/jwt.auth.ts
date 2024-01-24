import { PathParams } from 'express-serve-static-core';
require('dotenv/config');

let { expressjwt: jwt } = require('express-jwt');

const api = process.env.API_URL || '';
const auth = process.env.AUTH_URL || '';

export const JWTGuard = (): PathParams => {
	const secret = process.env.TOKEN_USER_SEED;
	return jwt({
		secret,
		algorithms: ['HS256'],
	}).unless({
		path: [
			`${auth}/users/login`,
			`${auth}/users/register`,
			{ url: new RegExp(`${api}/products.*`), methods: ['GET', 'OPTIONS'] },
			{ url: new RegExp(`${api}/categories.*`), methods: ['GET', 'OPTIONS'] },
		],
	});
};
