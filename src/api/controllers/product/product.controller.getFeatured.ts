import { Request, Response } from 'express';
import { handleError } from '../../functions/handle-error.function';
import {
	Product,
	productListAttributes,
} from '../../models/product/product.model';
import { ApiResponseInterface } from '../../interfaces/api-response.interface';

export const getFeaturedProducts = async (
	req: Request,
	res: Response
): Promise<void> => {
	try {
		/* 
			#swagger.summary = 'Get list of featured products.'
			#swagger.parameters['api'] = { description: 'A variable that stores part of the url.' }
			#swagger.parameters['count'] = { description: 'Count of requested feature products.' }

			#swagger.responses[200] = {
				schema: { 
					success: true,
					message: 'Products retrieved successfully.',
					payload: 'list of featured products',
				},
			}
		*/

		const count: string = req.params.count ? req.params.count : '0';

		const productsList = await Product.find({ isFeatured: true })
			.limit(parseInt(count))
			.select(productListAttributes);

		if (!productsList || productsList.length === 0) {
			const response: ApiResponseInterface = {
				success: true,
				message: 'Products retrieved successfully.',
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
