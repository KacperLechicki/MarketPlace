import { Request, Response } from 'express';
import { handleError } from '../../functions/handle-error.function';
import { Order, orderDetailsAttributes } from '../../models/order/order.model';
import { ApiResponseInterface } from '../../interfaces/api-response.interface';

export const getOrderById = async (
	req: Request,
	res: Response
): Promise<void> => {
	try {
		const order = await Order.findById(req.params.id)
			.populate('user', 'name')
			.populate({
				path: 'orderItems',
				populate: {
					path: 'product',
					populate: 'category',
				},
			})
			.select(orderDetailsAttributes);

		if (!order) {
			const response: ApiResponseInterface = {
				success: false,
				message: 'Order not found.',
				payload: null,
			};

			res.status(404).json(response);
		}

		const response: ApiResponseInterface = {
			success: true,
			message: 'Order retrieved successfully.',
			payload: order,
		};

		res.status(200).json(response);
	} catch (error: unknown) {
		handleError(res, error);
	}
};
