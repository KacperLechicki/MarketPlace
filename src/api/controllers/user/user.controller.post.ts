import { Request, Response } from 'express';
import { User } from '../../models/user/user.model';
import { handleError } from '../../functions/handle-error.function';
import bcrypt from 'bcrypt';
import { ServerResponse500 } from '../../classes/server-response-500.class';
import { ApiResponseInterface } from '../../interfaces/api-response.interface';
require('dotenv/config');

export const addUser = async (req: Request, res: Response): Promise<void> => {
	try {
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
	} catch (error: unknown) {
		handleError(res, error);
	}
};
