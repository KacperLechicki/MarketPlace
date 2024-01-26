import { Request, Response } from 'express';
import { handleError } from '../../functions/handle-error.function';
import { User } from '../../models/user/user.model';
import bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { ApiResponseInterface } from '../../interfaces/api-response.interface';
require('dotenv/config');

export const login = async (req: Request, res: Response): Promise<void> => {
	try {
		/* 
			#swagger.summary = 'Authorize user.'
			#swagger.parameters['auth'] = { description: 'A variable that stores part of the url.' }

			#swagger.parameters['body'] = {
				in: 'body',
				description: 'User credentials.',
				required: true,
				schema: {
					email: "User email",
					password: "User password",
				}
			}

			#swagger.responses[200] = {
				schema: { 
					success: true,
					message: 'User logged in successfully.',
					payload: 'token',
				},
			}

			#swagger.responses[401] = {
				schema: { 
					success: false,
					message: 'Credentials do not match. Authorization failed.',
					payload: 'null',
				}
			}

			#swagger.responses[404] = {
				schema: { 
					success: false,
					message: 'User not found.',
					payload: 'null',
				}
			}
		*/

		const user = await User.findOne({ email: req.body.email });

		if (!user) {
			const response: ApiResponseInterface = {
				success: false,
				message: 'User not found.',
				payload: null,
			};

			res.status(404).json(response);
			return;
		}

		if (user && bcrypt.compareSync(req.body.password, user.password)) {
			const token = jwt.sign(
				{
					userId: user.id,
					email: user.email,
					isAdmin: user.isAdmin,
				},
				process.env.TOKEN_USER_SEED as string,
				{ expiresIn: '1d' }
			);

			const response: ApiResponseInterface = {
				success: true,
				message: 'User logged in successfully.',
				payload: { token },
			};

			res.status(200).json(response);
		} else if (user && !bcrypt.compareSync(req.body.password, user.password)) {
			const response: ApiResponseInterface = {
				success: false,
				message: 'Credentials do not match. Authorization failed.',
				payload: null,
			};

			res.status(401).json(response);
		}
	} catch (error: unknown) {
		handleError(res, error);
	}
};
