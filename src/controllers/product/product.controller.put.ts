import { Request, Response } from 'express';
import { handleError } from '../../api/handle-error';
import { Product } from '../../models/product.model';

export const updateProduct = async (
	req: Request,
	res: Response
): Promise<void> => {
	try {
		const product = await Product.findByIdAndUpdate(
			req.params.id,
			{
				...req.body,
			},
			{ new: true }
		);

		if (!product) {
			res.status(404).json({
				success: false,
				message: 'Product not found.',
			});
			return;
		}

		res.status(200).json({
			success: true,
			message: 'Product updated successfully.',
		});
	} catch (error: unknown) {
		handleError(res, error);
	}
};
