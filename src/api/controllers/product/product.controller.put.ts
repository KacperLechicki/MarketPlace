import { Request, Response } from 'express';
import { handleError } from '../../functions/handle-error.function';
import { Product } from '../../models/product/product.model';
import { ApiResponseInterface } from '../../interfaces/api-response.interface';

export const updateProduct = async (
	req: Request,
	res: Response
): Promise<void> => {
	try {
		// #swagger.summary = 'Update existing product.'

		const product = await Product.findByIdAndUpdate(
			req.params.id,
			{
				...req.body,
			},
			{ new: true }
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
