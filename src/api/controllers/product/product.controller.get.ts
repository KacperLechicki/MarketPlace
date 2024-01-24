import { handleError } from '../../functions/handle-error.function';
import { ApiResponseInterface } from '../../interfaces/api-response.interface';
import {
	Product,
	productListAttributes,
} from '../../models/product/product.model';
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
			const response: ApiResponseInterface = {
				success: false,
				message: 'Products not found.',
				payload: [],
			};

			res.status(200).json(response);
			return;
		}

		const response: ApiResponseInterface = {
			success: true,
			message: 'Products retrieved successfully.',
			payload: productsList,
		};

		res.status(200).json(response);
	} catch (error: unknown) {
		handleError(res, error);
	}
};
