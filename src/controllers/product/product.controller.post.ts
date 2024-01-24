import { handleError } from '../../api/handle-error';
import { Product } from '../../models/product.model';
import { Request, Response } from 'express';

export const addProduct = async (
	req: Request,
	res: Response
): Promise<void> => {
	try {
		let product = new Product({
			...req.body,
		});

		const createdProduct = await product.save();

		if (!product) {
			res.status(500).send({ error: 'Product cannot be created.' });
			return;
		}

		res.status(201).json({
			success: true,
			message: 'Product created successfully.',
			createdProduct,
		});
	} catch (error: unknown) {
		handleError(res, error);
	}
};
