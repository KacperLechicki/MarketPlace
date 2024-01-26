import { Request, Response } from 'express';
import { User } from '../../models/user/user.model';
import { handleError } from '../../functions/handle-error.function';
import bcrypt from 'bcrypt';
import { ServerResponse500 } from '../../classes/server-response-500.class';
import { ApiResponseInterface } from '../../interfaces/api-response.interface';
require('dotenv/config');

export const addUser = async (req: Request, res: Response): Promise<void> => {
	try {
		/* 
			#swagger.summary = 'Add new user.'
			#swagger.parameters['auth'] = { description: 'A variable that stores part of the url.' }

			#swagger.parameters['body'] = {
				in: 'body',
				description: 'User data.',
				required: true,
				schema: {
					name: "User name",
					email: "User email",
					phone: "111 222 333",
					password: "User password",
					isAdmin: false,
				}
			}

			#swagger.responses[201] = {
				schema: { 
					success: true,
					message: 'User created successfully.',
					payload: 'createdUser object',
				},
			}

			#swagger.responses[400] = {
				schema: { 
					success: false,
					message: 'User with that e-mail already exists.',
					payload: 'null',
				},
			}

			#swagger.responses[500] = {
				schema: { 
					success: false,
					message: 'An error occurred.',
					error: 'error',
					payload: 'null',
				},
			}
		*/

		let user = new User({
			...req.body,
			password: bcrypt.hashSync(req.body.password, 12),
		});

		const createdUser = await user.save();

		if (!user) {
			res.status(500).json(new ServerResponse500('User cannot be created.'));
			return;
		}

		const response: ApiResponseInterface = {
			success: true,
			message: 'User created successfully.',
			payload: createdUser,
		};

		res.status(201).json(response);
	} catch (error: any) {
		if (error.code === 11000 && error.keyPattern.email === 1) {
			const response: ApiResponseInterface = {
				success: false,
				message: 'User with that e-mail already exists.',
				payload: null,
			};

			res.status(400).json(response);
		} else {
			handleError(res, error);
		}
	}
};
