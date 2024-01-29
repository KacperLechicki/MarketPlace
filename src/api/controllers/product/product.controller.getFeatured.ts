import { Request, Response } from 'express';
import { handleError } from '../../functions/handle-error.function';
import {
	Product,
	productListAttributes,
} from '../../models/product/product.model';
import { ApiResponseInterface } from '../../interfaces/api-response/api-response.interface';

/**
 * Get featured products.
 */
export const getFeaturedProducts = async (
	req: Request,
	res: Response
): Promise<void> => {
	/*
		#swagger.summary = 'Get featured products.'
        #swagger.parameters['api'] = { description: 'A variable that stores part of the url.' }
        #swagger.parameters['count'] = { description: 'Count of requested feature products.' }
	*/

	try {
		// Get the count parameter from the request, or default to '0' if it is not provided
		const count: string = req.params.count ? req.params.count : '0';

		// Try to find products that are marked as featured
		// Limit the number of products returned to the count parameter
		// Only select the attributes defined in productListAttributes
		const productsList = await Product.find({ isFeatured: true })
			.limit(parseInt(count))
			.select(productListAttributes);

		// If no featured products were found, return a success response with an empty array
		if (!productsList || productsList.length === 0) {
			/*
				#swagger.responses[404] = {
					schema: { 
						success: false,
						message: 'Products not found.',
						payload: '{ productsList: [] }',
					},
				}
			*/

			const response: ApiResponseInterface = {
				success: false,
				message: 'Products not found.',
				payload: { productsList: [] },
			};

			res.status(404).json(response);
			return;
		}

		/*
			#swagger.responses[200] = {
                schema: { 
                    success: true,
                    message: 'Products retrieved successfully.',
                    payload: '{ productsList }',
                },
            }
		*/

		// If featured products were found, return a success response with the list of products
		const response: ApiResponseInterface = {
			success: true,
			message: 'Products retrieved successfully.',
			payload: { productsList },
		};

		// Send the response with a 200 status code
		res.status(200).json(response);
	} catch (error: unknown) {
		// If an error occurred while trying to retrieve the featured products, handle it
		handleError(res, error);
	}
};
