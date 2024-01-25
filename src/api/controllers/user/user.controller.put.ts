import { Request, Response } from 'express';
import { handleError } from '../../functions/handle-error.function';
import { decodeToken } from '../../functions/decode-token.function';
import { ApiResponseInterface } from '../../interfaces/api-response.interface';
import { User } from '../../models/user/user.model';

export const updateUser = async (
	req: Request,
	res: Response
): Promise<void> => {
	try {
		const userData = await decodeToken(req);

		if (
			userData.isAdmin ||
			(!userData.isAdmin && userData.userId !== req.params.id)
		) {
			const response: ApiResponseInterface = {
				success: false,
				message: 'Unauthorized.',
				payload: null,
			};

			res.status(401).json(response);
			return;
		}

		const { isAdmin, ...bodyWithoutAdmin } = req.body;

		const user = await User.findByIdAndUpdate(
			req.params.id,
			{
				...bodyWithoutAdmin,
			},
			{ new: true }
		);

		if (!user) {
			const response: ApiResponseInterface = {
				success: false,
				message: 'User not found.',
				payload: null,
			};

			res.status(404).json(response);
			return;
		}

		const response: ApiResponseInterface = {
			success: true,
			message: 'User updated successfully.',
			payload: user,
		};

		res.status(200).json(response);
	} catch (error: unknown) {
		handleError(res, error);
	}
};
