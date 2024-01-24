import { Request, Response } from 'express';
import { handleError } from '../../api/handle-error';
import { Product } from '../../models/product.model';

export const getProductsCount = async (
	req: Request,
	res: Response
): Promise<void> => {
	try {
		const productsCount = await Product.countDocuments({});

		if (!productsCount) {
			res.status(404).json({
				success: false,
				message: 'Products not found.',
			});
			return;
		}

		res.status(200).send({ productsCount });
	} catch (error: unknown) {
		handleError(res, error);
	}
};
