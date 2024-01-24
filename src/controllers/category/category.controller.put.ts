import { handleError } from '../../api/handle-error';
import { Category } from '../../models/category.model';
import { Request, Response } from 'express';

export const updateCategory = async (
	req: Request,
	res: Response
): Promise<void> => {
	try {
		const category = await Category.findByIdAndUpdate(
			req.params.id,
			{
				...req.body,
			},
			{ new: true }
		);

		if (!category) {
			res.status(404).json({
				success: false,
				message: 'Category not found.',
			});
			return;
		}

		res.status(200).json({
			success: true,
			message: 'Category updated successfully.',
		});
	} catch (error: unknown) {
		handleError(res, error);
	}
};
