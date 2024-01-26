import { handleError } from '../../functions/handle-error.function';
import { ApiResponseInterface } from '../../interfaces/api-response.interface';
import {
	Product,
	productListAttributes,
} from '../../models/product/product.model';
import { Request, Response } from 'express';

export const getProducts = async (
	req: Request,
	res: Response
): Promise<void> => {
	try {
		/* 
			#swagger.summary = 'Get list of products.'
			#swagger.parameters['api'] = { description: 'A variable that stores part of the url.' }
			#swagger.parameters['category'] = { description: 'Categories ids.' }

			#swagger.responses[200] = {
				schema: { 
					success: true,
					message: 'Products retrieved successfully.',
					payload: 'list of products',
				},
			}
		*/

		let filter = {};

		if (req.query.categories && typeof req.query.categories === 'string') {
			filter = { category: req.query.categories.split(',') };
		}

		const productsList = await Product.find(filter).select(
			productListAttributes
		);

		if (!productsList || productsList.length === 0) {
			const response: ApiResponseInterface = {
				success: true,
				message: 'Products not found.',
				payload: [],
			};

			res.status(200).json(response);
			return;
		}

		const response: ApiResponseInterface = {
			success: true,
			message: 'Products retrieved successfully.',
			payload: productsList,
		};

		res.status(200).json(response);
	} catch (error: unknown) {
		handleError(res, error);
	}
};
