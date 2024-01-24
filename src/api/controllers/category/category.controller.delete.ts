import { handleError } from '../../functions/handle-error.function';
import { ApiResponseInterface } from '../../interfaces/api-response.interface';
import { Category } from '../../models/category/category.model';
import { Request, Response } from 'express';

export const deleteCategory = async (
	req: Request,
	res: Response
): Promise<void> => {
	try {
		const category = await Category.findByIdAndDelete(req.params.id);

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
			message: 'Category deleted successfully.',
			payload: null,
		};

		res.status(200).json(response);
	} catch (error: unknown) {
		handleError(res, error);
	}
};
