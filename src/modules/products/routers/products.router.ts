import express, {Request, Response} from 'express';
import {Product} from '../models/product.model'

const router = express.Router();
const api = process.env.API_URL || '';


router.get(
	`/`,
	async (req: Request, res: Response): Promise<void> => {
		const productsList = await Product.find();

		if (!productsList) {
			res.status(500).json({ success: false });
		}
		res.send(productsList);
	}
);

router.post(`/`, (req: Request, res: Response): void => {
	const product = new Product({
		name: req.body.name,
		image: req.body.image,
		stock: req.body.stock,
	});

	product
		.save()
		.then((createdProduct): void => {
			res.status(201).json(createdProduct);
		})
		.catch((err: string): void => {
			res.status(500).json({
				error: err,
				success: false,
			});
		});
});

module.exports = router;