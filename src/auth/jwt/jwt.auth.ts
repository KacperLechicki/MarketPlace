import { Request } from 'express';
import { PathParams } from 'express-serve-static-core';
require('dotenv/config');

let { expressjwt: jwt } = require('express-jwt');

const api = process.env.API_URL || '';
const auth = process.env.AUTH_URL || '';
const secret = process.env.TOKEN_USER_SEED || '';

export const JWTGuard = (): PathParams => {
	return jwt({
		secret,
		algorithms: ['HS256'],
		isRevoked: isRevoked,
	}).unless({
		path: [
			`${auth}/users/login`,
			`${auth}/users/register`,
			{ url: new RegExp(`${api}/products.*`), methods: ['GET', 'OPTIONS'] },
			{ url: new RegExp(`${api}/categories.*`), methods: ['GET', 'OPTIONS'] },
		],
	});
};

async function isRevoked(
	req: Request,
	token: { payload: { isAdmin: boolean } }
): Promise<boolean> {
	if (!token.payload.isAdmin) {
		return true;
	}

	return false;
}
