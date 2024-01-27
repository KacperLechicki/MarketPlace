import { Request, Response } from 'express';
import { handleError } from '../../functions/handle-error.function';
import { Product } from '../../models/product/product.model';
import { ApiResponseInterface } from '../../interfaces/api-response.interface';

export const updateProduct = async (
	req: Request,
	res: Response
): Promise<void> => {
	try {
		/* 
			#swagger.summary = 'Update existing product.'
			#swagger.parameters['api'] = { description: 'A variable that stores part of the url.' }
			#swagger.parameters['id'] = { description: 'Id of product.' }

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

			#swagger.responses[200] = {
				schema: { 
					success: true,
					message: 'Product updated successfully.',
					payload: 'null',
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

		const product = await Product.findByIdAndUpdate(
			req.params.id,
			{
				...req.body,
			},
			{ new: true, runValidators: true }
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
			message: 'Product updated successfully.',
			payload: product,
		};

		res.status(200).json(response);
	} catch (error: unknown) {
		handleError(res, error);
	}
};
