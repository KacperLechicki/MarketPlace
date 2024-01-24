import { handleError } from '../../api/handle-error';
import { Request, Response } from 'express';
import { Product } from '../../models/product.model';

export const deleteProduct = async (
	req: Request,
	res: Response
): Promise<void> => {
	try {
		const product = await Product.findByIdAndDelete(req.params.id);

		if (!product) {
			res.status(404).json({
				success: false,
				message: 'Product not found.',
			});
			return;
		}

		res.status(200).json({
			success: true,
			message: 'Product deleted successfully.',
		});
	} catch (error: unknown) {
		handleError(res, error);
	}
};
