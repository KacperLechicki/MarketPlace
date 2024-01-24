import { handleError } from '../../api/handle-error';
import { Category } from '../../models/category.model';
import { Request, Response } from 'express';

export const deleteCategory = async (
	req: Request,
	res: Response
): Promise<void> => {
	try {
		const category = await Category.findByIdAndDelete(req.params.id);

		if (!category) {
			res.status(404).json({
				success: false,
				message: 'Category not found.',
			});
			return;
		}

		res.status(200).json({
			success: true,
			message: 'Category deleted successfully.',
		});
	} catch (error: unknown) {
		handleError(res, error);
	}
};
