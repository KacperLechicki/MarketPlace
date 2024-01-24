import { Request, Response } from 'express';
import { Product } from '../models/product.model';
import { ProductInterface } from '../interfaces/product.interface';

export const getProducts = async (req: Request, res: Response): Promise<void> => {
    const productsList = await Product.find();

    if (!productsList) {
        res.status(500).json({ success: false });
    }
    res.send(productsList);
};

export const createProduct = (req: Request, res: Response): void => {
    const product = new Product({
        name: req.body.name,
        image: req.body.image,
        stock: req.body.stock,
    });

    product
        .save()
        .then((createdProduct: ProductInterface): void => {
            res.status(201).json(createdProduct);
        })
        .catch((err: string): void => {
            res.status(500).json({
                error: err,
                success: false,
            });
        });
};