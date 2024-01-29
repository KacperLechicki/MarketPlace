import { handleError } from '../../functions/handle-error.function';
import { ApiResponseInterface } from '../../interfaces/api-response.interface';
import {
	Product,
	productListAttributes,
} from '../../models/product/product.model';
import { Request, Response } from 'express';

/**
 * Get all products.
 */
export const getProducts = async (
	req: Request,
	res: Response
): Promise<void> => {
	/*
		#swagger.summary = 'Get all products.'
        #swagger.parameters['api'] = { description: 'A variable that stores part of the url.' }
        #swagger.parameters['category'] = { description: 'Categories ids.' }
	*/

	try {
		// Initialize an empty filter object
		let filter = {};

		// If the request query contains a 'categories' parameter, update the filter to filter by categories
		if (req.query.categories && typeof req.query.categories === 'string') {
			filter = { category: req.query.categories.split(',') };
		}

		// Try to find products that match the filter
		const productsList = await Product.find(filter).select(
			productListAttributes
		);

		// If no products were found, return a success response with an empty array
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

		// If products were found, return a success response with the list of products
		const response: ApiResponseInterface = {
			success: true,
			message: 'Products retrieved successfully.',
			payload: { productsList },
		};

		// Send the response with a 200 status code
		res.status(200).json(response);
	} catch (error: unknown) {
		// If an error occurred while trying to retrieve the products, handle it
		handleError(res, error);
	}
};
