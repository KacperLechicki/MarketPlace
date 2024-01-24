import { Request, Response } from 'express';
import { handleError } from '../../../api/handle-error';
import { User } from '../../models/user.model';
import bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
require('dotenv/config');

export const login = async (req: Request, res: Response): Promise<void> => {
	try {
		const user = await User.findOne({ email: req.body.email });

		if (!user) {
			res.status(404).json({ success: false, message: 'User not found.' });
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
				{ expiresIn: '2h' }
			);

			res.status(200).json({
				success: true,
				message: 'User logged in successfully.',
				token,
			});
		} else if (user && !bcrypt.compareSync(req.body.password, user.password)) {
			res.status(401).json({
				success: false,
				message: 'Credentials do not match. Authorization failed.',
			});
		}
	} catch (error: unknown) {
		handleError(res, error);
	}
};
