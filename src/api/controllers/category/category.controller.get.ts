import { handleError } from '../../functions/handle-error.function';
import { ApiResponseInterface } from '../../interfaces/api-response.interface';
import {
	Category,
	categoryListAttributes,
} from '../../models/category/category.model';
import { Request, Response } from 'express';

export const getCategories = async (
	req: Request,
	res: Response
): Promise<void> => {
	try {
		/* 
			#swagger.summary = 'Get list of categories.'
			#swagger.parameters['api'] = { description: 'A variable that stores part of the url.' }

			#swagger.responses[200] = {
				schema: { 
					success: true,
					message: 'Categories retrieved successfully.',
					payload: 'list of categories',
				},
			}
		*/

		const categoriesList = await Category.find().select(categoryListAttributes);

		if (!categoriesList || categoriesList.length === 0) {
			const response: ApiResponseInterface = {
				success: true,
				message: 'Categories not found.',
				payload: [],
			};

			res.status(200).json(response);
			return;
		}

		const response: ApiResponseInterface = {
			success: true,
			message: 'Categories retrieved successfully.',
			payload: categoriesList,
		};

		res.status(200).json(response);
	} catch (error: unknown) {
		handleError(res, error);
	}
};
