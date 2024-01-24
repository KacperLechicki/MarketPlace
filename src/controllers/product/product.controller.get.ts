import { handleError } from '../../api/handle-error';
import { Product, productListAttributes } from '../../models/product.model';
import { Request, Response } from 'express';

export const getProducts = async (
	req: Request,
	res: Response
): Promise<void> => {
	try {
		let filter = {};

		if (req.query.categories && typeof req.query.categories === 'string') {
			filter = { category: req.query.categories.split(',') };
		}

		const productsList = await Product.find(filter).select(
			productListAttributes
		);

		if (!productsList || productsList.length === 0) {
			res.status(200).json([]);
			return;
		}

		res.status(200).json(productsList);
	} catch (error: unknown) {
		handleError(res, error);
	}
};