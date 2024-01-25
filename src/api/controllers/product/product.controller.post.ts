import { ServerResponse500 } from '../../classes/server-response-500.class';
import { handleError } from '../../functions/handle-error.function';
import { ApiResponseInterface } from '../../interfaces/api-response.interface';
import { Product } from '../../models/product/product.model';
import { Request, Response } from 'express';

export const addProduct = async (
	req: Request,
	res: Response
): Promise<void> => {
	try {
		// #swagger.summary = 'Add new product.'

		let product = new Product({
			...req.body,
		});

		const createdProduct = await product.save();

		if (!product) {
			res.status(500).send(new ServerResponse500('Product cannot be created.'));
			return;
		}

		const response: ApiResponseInterface = {
			success: true,
			message: 'Product created successfully.',
			payload: createdProduct,
		};

		res.status(201).json(response);
	} catch (error: unknown) {
		handleError(res, error);
	}
};
