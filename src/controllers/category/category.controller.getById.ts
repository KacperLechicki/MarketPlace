import { handleError } from '../../api/handle-error';
import {
	Category,
	categoryDetailsAttributes,
} from '../../models/category.model';
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
			res.status(404).json({
				success: false,
				message: 'Category not found.',
			});
			return;
		}

		res.status(200).json(category);
	} catch (error: unknown) {
		handleError(res, error);
	}
};
