import { Request, Response } from 'express';
import { handleError } from '../../api/handle-error';
import { Product, productDetailsAttributes } from '../../models/product.model';

export const getProductById = async (
	req: Request,
	res: Response
): Promise<void> => {
	try {
		const product = await Product.findById(req.params.id).select(
			productDetailsAttributes
		);

		if (!product) {
			res.status(404).json({
				success: false,
				message: 'Product not found.',
			});
			return;
		}

		res.status(200).json(product);
	} catch (error: unknown) {
		handleError(res, error);
	}
};
