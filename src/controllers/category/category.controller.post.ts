import { handleError } from '../../api/handle-error';
import { Category } from '../../models/category.model';
import { Request, Response } from 'express';

export const addCategory = async (
	req: Request,
	res: Response
): Promise<void> => {
	try {
		let category = new Category({
			...req.body,
		});

		const createdCategory = await category.save();

		if (!category) {
			res.status(500).send({ error: 'Category cannot be created.' });
			return;
		}

		res.status(201).json({
			success: true,
			message: 'Category created successfully.',
			createdCategory,
		});
	} catch (error: unknown) {
		handleError(res, error);
	}
};
