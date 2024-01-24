import { Request, Response } from 'express';
import { Product } from '../models/product.model';
import { ProductInterface } from '../interfaces/product.interface';

export const getProducts = async (
	req: Request,
	res: Response
): Promise<void> => {
	try {
		const productsList = await Product.find();

		if (!productsList || productsList.length === 0) {
			res.status(200).json([]);
			return;
		}

		res.status(200).json(productsList);
	} catch (error: unknown) {
		res.status(500).json({
			success: false,
			message: 'An error occurred while retrieving the list of products.',
			error: error,
		});
	}
};

export const createProduct = async (
	req: Request,
	res: Response
): Promise<void> => {
	try {
		const product = new Product({
			name: req.body.name,
			image: req.body.image,
			stock: req.body.stock,
		});

		const createdProduct: ProductInterface = await product.save();

		res.status(201).json(createdProduct);
	} catch (error: unknown) {
		res.status(500).json({
			success: false,
			message: 'An error occurred while creating the product.',
			error: error,
		});
	}
};
