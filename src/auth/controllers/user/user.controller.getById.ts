import { Request, Response } from 'express';
import { User, userDetailsAttributes } from '../../models/user.model';
import { handleError } from '../../../api/handle-error';

export const getUserById = async (
	req: Request,
	res: Response
): Promise<void> => {
	try {
		const user = await User.findById(req.params.id).select(
			userDetailsAttributes
		);

		if (!user) {
			res.status(404).json({
				success: false,
				message: 'User not found.',
			});
			return;
		}

		res.status(200).json(user);
	} catch (error: unknown) {
		handleError(res, error);
	}
};
