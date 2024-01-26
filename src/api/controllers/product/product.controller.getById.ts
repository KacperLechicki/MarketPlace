import { Request, Response } from 'express';
import { handleError } from '../../functions/handle-error.function';
import {
	Product,
	productDetailsAttributes,
} from '../../models/product/product.model';
import { ApiResponseInterface } from '../../interfaces/api-response.interface';

export const getProductById = async (
	req: Request,
	res: Response
): Promise<void> => {
	try {
		/* 
			#swagger.summary = 'Get product by id.'
			#swagger.parameters['api'] = { description: 'A variable that stores part of the url.' }
			#swagger.parameters['id'] = { description: 'Id of product.' }

			#swagger.responses[200] = {
				schema: { 
					success: true,
					message: 'Product retrieved successfully.',
					payload: 'product object',
				},
			}

			#swagger.responses[404] = {
				schema: { 
					success: false,
					message: 'Product not found.',
					payload: 'null',
				},
			}
		*/

		const product = await Product.findById(req.params.id).select(
			productDetailsAttributes
		);

		if (!product) {
			const response: ApiResponseInterface = {
				success: false,
				message: 'Product not found.',
				payload: null,
			};

			res.status(404).json(response);
			return;
		}

		const response: ApiResponseInterface = {
			success: true,
			message: 'Product retrieved successfully.',
			payload: product,
		};

		res.status(200).json(response);
	} catch (error: unknown) {
		handleError(res, error);
	}
};
