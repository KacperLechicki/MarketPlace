import { handleError } from '../../functions/handle-error.function';
import { ApiResponseInterface } from '../../interfaces/api-response.interface';
import {
	Category,
	categoryDetailsAttributes,
} from '../../models/category/category.model';
import { Request, Response } from 'express';

export const getCategoryById = async (
	req: Request,
	res: Response
): Promise<void> => {
	try {
		const category = await Category.findById(req.params.id).select(
			categoryDetailsAttributes
		);

		if (!category) {
			const response: ApiResponseInterface = {
				success: false,
				message: 'Category not found.',
				payload: null,
			};

			res.status(404).json(response);
			return;
		}

		const response: ApiResponseInterface = {
			success: true,
			message: 'Category retrieved successfully.',
			payload: category,
		};

		res.status(200).json(response);
	} catch (error: unknown) {
		handleError(res, error);
	}
};
