import { Request, Response } from 'express';
import { handleError } from '../../functions/handle-error.function';
import { Product } from '../../models/product/product.model';
import { ApiResponseInterface } from '../../interfaces/api-response/api-response.interface';

/**
 * Update existing product.
 */
export const updateProduct = async (
	req: Request,
	res: Response
): Promise<void> => {
	/*
		#swagger.summary = 'Update existing product.'
        #swagger.parameters['api'] = { description: 'A variable that stores part of the url.' }
        #swagger.parameters['id'] = { description: 'Id of product.' }
	*/

	/*
		#swagger.parameters['body'] = {
            in: 'body',
            description: 'Product data.',
            required: false,
            schema: {
                name: "Product name",
                description: "Product short description",
                longDescription: "Product long description",
                image: "Path to product image",
                images: [],
                brand: "Product brand",
                price: 10.00,
                stock: 1,
                category: "Id of product category",
                rating: 6,
                isFeatured: false
            }
        }
	*/

	try {
		// Try to find the product by its ID and update it with the data from the request body
		// The options { new: true, runValidators: true } ensure that the updated product is returned and that the update data is validated
		const product = await Product.findByIdAndUpdate(
			req.params.id,
			{
				...req.body,
			},
			{ new: true, runValidators: true }
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
                    message: 'Product updated successfully.',
                    payload: '{ product }',
                },
            }
		*/

		// If the product was found and updated, return a success response with the updated product
		const response: ApiResponseInterface = {
			success: true,
			message: 'Product updated successfully.',
			payload: { product },
		};

		// Send the response with a 200 status code
		res.status(200).json(response);
	} catch (error: unknown) {
		// If an error occurred while trying to update the product, handle it
		handleError(res, error);
	}
};
