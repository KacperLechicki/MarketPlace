import { ServerResponse500 } from '../../classes/server-response-500.class';
import { handleError } from '../../functions/handle-error.function';
import { ApiResponseInterface } from '../../interfaces/api-response/api-response.interface';
import { Product } from '../../models/product/product.model';
import { Request, Response } from 'express';

/**
 * Add new product.
 */
export const addProduct = async (
	req: Request,
	res: Response
): Promise<void> => {
	/*
		#swagger.summary = 'Add new product.'
        #swagger.parameters['api'] = { description: 'A variable that stores part of the url.' }
	*/

	/*
		#swagger.parameters['body'] = {
            in: 'body',
            description: 'Product data.',
            required: true,
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
		// Create a new Product instance with the data from the request body
		let product = new Product({
			...req.body,
		});

		// Try to save the new product to the database
		const createdProduct = await product.save();

		// If the product was not saved successfully, return a 500 response
		if (!product) {
			/*
				#swagger.responses[500] = {
					schema: { 
						success: false,
						message: 'Product cannot be created.',
						payload: 'null',
					},
				}
			*/

			res.status(500).send(new ServerResponse500('Product cannot be created.'));
			return;
		}

		/*
			#swagger.responses[201] = {
                schema: { 
                    success: true,
                    message: 'Product created successfully.',
                    payload: '{ createdProduct }',
                },
            }
		*/

		// If the product was saved successfully, return a success response with the created product
		const response: ApiResponseInterface = {
			success: true,
			message: 'Product created successfully.',
			payload: { createdProduct },
		};

		// Send the response with a 201 status code
		res.status(201).json(response);
	} catch (error: unknown) {
		// If an error occurred while trying to save the product, handle it
		handleError(res, error);
	}
};
