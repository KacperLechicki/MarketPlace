import { ServerResponse500 } from '../../classes/server-response-500.class';
import { handleError } from '../../functions/handle-error.function';
import { ApiResponseInterface } from '../../interfaces/api-response.interface';
import { Product } from '../../models/product/product.model';
import { Request, Response } from 'express';

export const addProduct = async (
	req: Request,
	res: Response
): Promise<void> => {
	try {
		/* 
			#swagger.summary = 'Add new product.'
			#swagger.parameters['api'] = { description: 'A variable that stores part of the url.' }

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

			#swagger.responses[201] = {
				schema: { 
					success: true,
					message: 'Product created successfully.',
					payload: 'createdProduct object',
				},
			}

			#swagger.responses[500] = {
				schema: { 
					success: false,
					message: 'An error occurred.',
					error: 'error',
					payload: 'null',
				},
			}
		*/

		let product = new Product({
			...req.body,
		});

		const createdProduct = await product.save();

		if (!product) {
			res.status(500).send(new ServerResponse500('Product cannot be created.'));
			return;
		}

		const response: ApiResponseInterface = {
			success: true,
			message: 'Product created successfully.',
			payload: createdProduct,
		};

		res.status(201).json(response);
	} catch (error: unknown) {
		handleError(res, error);
	}
};
