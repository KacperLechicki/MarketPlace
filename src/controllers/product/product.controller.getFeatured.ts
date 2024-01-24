import { Request, Response } from 'express';
import { handleError } from '../../api/handle-error';
import { Product, productListAttributes } from '../../models/product.model';

export const getFeaturedProducts = async (
	req: Request,
	res: Response
): Promise<void> => {
	try {
		const count: string = req.params.count ? req.params.count : '0';

		const productsList = await Product.find({ isFeatured: true })
			.limit(parseInt(count))
			.select(productListAttributes);

		if (!productsList || productsList.length === 0) {
			res.status(200).json([]);
			return;
		}

		res.status(200).json(productsList);
	} catch (error: unknown) {
		handleError(res, error);
	}
};
