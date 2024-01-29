import { handleError } from '../../functions/handle-error.function';
import { Request, Response } from 'express';
import { Product } from '../../models/product/product.model';
import { ApiResponseInterface } from '../../interfaces/api-response/api-response.interface';

/**
 * Delete a product by ID.
 */
export const deleteProduct = async (
	req: Request,
	res: Response
): Promise<void> => {
	/*
		#swagger.summary = 'Delete a product by ID.'
        #swagger.parameters['api'] = { description: 'A variable that stores part of the url.' }
        #swagger.parameters['id'] = { description: 'Id of product.' }
	*/

	try {
		// Try to find the product by its ID and delete it
		const product = await Product.findByIdAndDelete(req.params.id);

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
                    message: 'Product deleted successfully.',
                    payload: 'null',
                },
            }
		*/

		// If the product was found and deleted, return a success response
		const response: ApiResponseInterface = {
			success: true,
			message: 'Product deleted successfully.',
			payload: null,
		};

		// Send the response with a 200 status code
		res.status(200).json(response);
	} catch (error: unknown) {
		// If an error occurred while trying to delete the product, handle it
		handleError(res, error);
	}
};
