import { handleError } from '../../../api/handle-error';
import { Request, Response } from 'express';
import { User, userListAttributes } from '../../models/user.model';

export const getUsers = async (req: Request, res: Response): Promise<void> => {
	try {
		const usersList = await User.find().select(userListAttributes);

		if (!usersList || usersList.length === 0) {
			res.status(200).json([]);
			return;
		}

		res.status(200).json(usersList);
	} catch (error: unknown) {
		handleError(res, error);
	}
};
