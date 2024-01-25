import { handleError } from '../../functions/handle-error.function';
import { Request, Response } from 'express';
import { Product } from '../../models/product/product.model';
import { ApiResponseInterface } from '../../interfaces/api-response.interface';

export const deleteProduct = async (
	req: Request,
	res: Response
): Promise<void> => {
	try {
		// #swagger.summary = 'Delete a product.'

		const product = await Product.findByIdAndDelete(req.params.id);

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
			message: 'Product deleted successfully.',
			payload: null,
		};

		res.status(200).json(response);
	} catch (error: unknown) {
		handleError(res, error);
	}
};
