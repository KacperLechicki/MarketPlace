import { ServerResponse500 } from '../../api/classes/server-response-500.class';
import { handleError } from '../../api/functions/handle-error.function';
import { ApiResponseInterface } from '../../api/interfaces/api-response.interface';
import { Category } from '../../models/category/category.model';
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
			res
				.status(500)
				.send(new ServerResponse500('Category cannot be created.'));
			return;
		}

		const response: ApiResponseInterface = {
			success: true,
			message: 'Category created successfully.',
			payload: createdCategory,
		};

		res.status(201).json(response);
	} catch (error: unknown) {
		handleError(res, error);
	}
};
