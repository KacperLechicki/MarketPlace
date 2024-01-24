import { Request, Response } from 'express';
import { User } from '../../models/user.model';
import { handleError } from '../../../api/handle-error';
import bcrypt from 'bcrypt';
require('dotenv/config');

export const addUser = async (req: Request, res: Response): Promise<void> => {
	try {
		let user = new User({
			...req.body,
			password: bcrypt.hashSync(req.body.password, 12),
		});

		const createdUser = await user.save();

		if (!user) {
			res.status(500).send({ error: 'User cannot be created.' });
			return;
		}

		res.status(201).json({
			success: true,
			message: 'User created successfully.',
			createdUser,
		});
	} catch (error: unknown) {
		handleError(res, error);
	}
};
