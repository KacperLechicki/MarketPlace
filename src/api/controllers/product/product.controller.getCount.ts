import { Request, Response } from 'express';
import { handleError } from '../../functions/handle-error.function';
import { Product } from '../../models/product/product.model';
import { ApiResponseInterface } from '../../interfaces/api-response.interface';

export const getProductsCount = async (
	req: Request,
	res: Response
): Promise<void> => {
	try {
		/* 
			#swagger.summary = 'Get count of products.'
			#swagger.parameters['api'] = { description: 'A variable that stores part of the url.' }

			#swagger.responses[200] = {
				schema: { 
					success: true,
					message: 'Products count retrieved successfully.',
					payload: 'productsCount: count',
				},
			}

			#swagger.responses[404] = {
				schema: { 
					success: false,
					message: 'Products not found.',
					payload: 'productsCount: 0',
				},
			}
		*/

		const productsCount = await Product.countDocuments({});

		if (!productsCount) {
			const response: ApiResponseInterface = {
				success: false,
				message: 'Products not found.',
				payload: { productsCount: 0 },
			};

			res.status(404).json(response);
			return;
		}

		const response: ApiResponseInterface = {
			success: true,
			message: 'Products count retrieved successfully.',
			payload: { productsCount },
		};

		res.status(200).send(response);
	} catch (error: unknown) {
		handleError(res, error);
	}
};
