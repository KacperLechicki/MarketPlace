import { Request, Response } from 'express';
import { handleError } from '../../functions/handle-error.function';
import { ApiResponseInterface } from '../../interfaces/api-response.interface';
import { Category } from '../../models/category/category.model';

export const getCategoriesCount = async (
	req: Request,
	res: Response
): Promise<void> => {
	try {
		// #swagger.summary = 'Get count of categories.'

		const categoriesCount = await Category.countDocuments({});

		if (!categoriesCount) {
			const response: ApiResponseInterface = {
				success: false,
				message: 'Categories not found.',
				payload: { categoriesCount: 0 },
			};

			res.status(404).json(response);
			return;
		}

		const response: ApiResponseInterface = {
			success: true,
			message: 'Categories count retrieved successfully.',
			payload: { categoriesCount },
		};

		res.status(200).send(response);
	} catch (error: unknown) {
		handleError(res, error);
	}
};
