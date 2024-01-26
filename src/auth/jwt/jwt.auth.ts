import { PathParams } from 'express-serve-static-core';
import { isRevoked } from './functions/is-revoked.function';
require('dotenv/config');

let { expressjwt: jwt } = require('express-jwt');

const api = process.env.API_URL || '';
const auth = process.env.AUTH_URL || '';
const docs = process.env.DOCS_URL || '';
const secret = process.env.TOKEN_USER_SEED || '';

export const JWTGuard = (): PathParams => {
	return jwt({
		secret,
		algorithms: ['HS256'],
		isRevoked: isRevoked,
	}).unless({
		path: [
			`${docs}`,
			`${auth}/users/login`,
			`${auth}/users/register`,
			{ url: new RegExp(`${api}/products.*`), methods: ['GET', 'OPTIONS'] },
			{ url: new RegExp(`${api}/categories.*`), methods: ['GET', 'OPTIONS'] },
			{
				url: new RegExp(`${auth}/users/\\w+$`),
				methods: ['GET', 'PUT', 'DELETE', 'OPTIONS'],
			},
			{
				url: new RegExp(`${api}/orders.*`),
				methods: ['GET', 'POST', 'OPTIONS'],
			},
		],
	});
};
