import { Request, Response } from 'express';
import { handleError } from '../../functions/handle-error.function';
import {
	Product,
	productDetailsAttributes,
} from '../../models/product/product.model';
import { ApiResponseInterface } from '../../interfaces/api-response.interface';

/**
 * Get product by ID.
 */
export const getProductById = async (
	req: Request,
	res: Response
): Promise<void> => {
	/*
		#swagger.summary = 'Get product by ID.'
        #swagger.parameters['api'] = { description: 'A variable that stores part of the url.' }
        #swagger.parameters['id'] = { description: 'Id of product.' }
	*/

	try {
		// Try to find the product by its ID
		const product = await Product.findById(req.params.id).select(
			productDetailsAttributes
		);

		// If the product was not found, return a 404 response
		if (!product) {
			/*
				#swagger.responses[404] = {
					schema: { 
						success: false,
						message: 'Product not found.',
						payload: 'null',
					},
				}
			*/

			const response: ApiResponseInterface = {
				success: false,
				message: 'Product not found.',
				payload: null,
			};

			res.status(404).json(response);
			return;
		}

		/*
			#swagger.responses[200] = {
                schema: { 
                    success: true,
                    message: 'Product retrieved successfully.',
                    payload: '{ product }',
                },
            }
		*/

		// If the product was found, return a success response with the product
		const response: ApiResponseInterface = {
			success: true,
			message: 'Product retrieved successfully.',
			payload: { product },
		};

		// Send the response with a 200 status code
		res.status(200).json(response);
	} catch (error: unknown) {
		// If an error occurred while trying to retrieve the product, handle it
		handleError(res, error);
	}
};
