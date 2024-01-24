import { Request, Response } from 'express';
import { handleError } from '../../api/functions/handle-error.function';
import { Product } from '../../models/product/product.model';
import { ApiResponseInterface } from '../../api/interfaces/api-response.interface';

export const getProductsCount = async (
	req: Request,
	res: Response
): Promise<void> => {
	try {
		const productsCount = await Product.countDocuments({});

		if (!productsCount) {
			const response: ApiResponseInterface = {
				success: false,
				message: 'Products not found.',
				payload: null,
			};

			res.status(404).json(response);
			return;
		}

		const response: ApiResponseInterface = {
			success: true,
			message: 'Products count retrieved successfully.',
			payload: { productsCount },
		};

		res.status(200).send(response);
	} catch (error: unknown) {
		handleError(res, error);
	}
};
