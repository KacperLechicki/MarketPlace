import { Request, Response } from 'express';
import { handleError } from '../../functions/handle-error.function';
import { Product } from '../../models/product/product.model';
import { ApiResponseInterface } from '../../interfaces/api-response.interface';

/**
 * Get products count.
 */
export const getProductsCount = async (
	req: Request,
	res: Response
): Promise<void> => {
	/*
		#swagger.summary = 'Get products count.'
        #swagger.parameters['api'] = { description: 'A variable that stores part of the url.' }
	*/

	try {
		// Try to count all documents in the Product collection
		const productsCount = await Product.countDocuments({});

		// If the count is zero, return a 404 response
		if (!productsCount) {
			/*
				#swagger.responses[404] = {
					schema: { 
						success: false,
						message: 'Products not found.',
						payload: '{ productsCount: 0 }',
					},
				}
			*/

			const response: ApiResponseInterface = {
				success: false,
				message: 'Products not found.',
				payload: { productsCount: 0 }, // Return the count as 0
			};

			res.status(404).json(response);
			return;
		}

		/*
			#swagger.responses[200] = {
                schema: { 
                    success: true,
                    message: 'Products count retrieved successfully.',
                    payload: '{ productsCount }',
                },
            }
		*/

		// If the count is more than zero, return a success response with the count
		const response: ApiResponseInterface = {
			success: true,
			message: 'Products count retrieved successfully.',
			payload: { productsCount }, // Return the count
		};

		// Send the response with a 200 status code
		res.status(200).send(response);
	} catch (error: unknown) {
		// If an error occurred while trying to count the products, handle it
		handleError(res, error);
	}
};
