import { Request, Response } from 'express';
import { handleError } from '../../functions/handle-error.function';
import { Order, orderListAttributes } from '../../models/order/order.model';
import { ApiResponseInterface } from '../../interfaces/api-response.interface';

export const getOrders = async (req: Request, res: Response): Promise<void> => {
	try {
		/* 
			#swagger.summary = 'Get list of orders.'
			#swagger.parameters['api'] = { description: 'A variable that stores part of the url.' }

			#swagger.responses[200] = {
				schema: { 
					success: true,
					message: 'Orders retrieved successfully.',
					payload: 'list of orders',
				},
			}
		*/

		const orderList = await Order.find().select(orderListAttributes);

		if (!orderList || orderList.length === 0) {
			const response: ApiResponseInterface = {
				success: true,
				message: 'Orders not found',
				payload: [],
			};

			res.status(200).json(response);
			return;
		}

		const response: ApiResponseInterface = {
			success: true,
			message: 'Orders retrieved successfully',
			payload: orderList,
		};

		res.status(200).json(response);
	} catch (error: unknown) {
		handleError(res, error);
	}
};
