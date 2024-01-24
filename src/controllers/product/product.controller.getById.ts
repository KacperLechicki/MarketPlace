import { Request, Response } from 'express';
import { handleError } from '../../api/functions/handle-error.function';
import {
	Product,
	productDetailsAttributes,
} from '../../models/product/product.model';
import { ApiResponseInterface } from '../../api/interfaces/api-response.interface';

export const getProductById = async (
	req: Request,
	res: Response
): Promise<void> => {
	try {
		const product = await Product.findById(req.params.id).select(
			productDetailsAttributes
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
			message: 'Product retrieved successfully.',
			payload: product,
		};

		res.status(200).json(response);
	} catch (error: unknown) {
		handleError(res, error);
	}
};
