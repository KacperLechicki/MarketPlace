import { handleError } from '../../api/handle-error';
import { Category, categoryListAttributes } from '../../models/category.model';
import { Request, Response } from 'express';

export const getCategories = async (
	req: Request,
	res: Response
): Promise<void> => {
	try {
		const categoriesList = await Category.find().select(categoryListAttributes);

		if (!categoriesList || categoriesList.length === 0) {
			res.status(200).json([]);
			return;
		}

		res.status(200).json(categoriesList);
	} catch (error: unknown) {
		handleError(res, error);
	}
};
