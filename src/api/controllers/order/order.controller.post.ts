import { Request, Response } from 'express';
import { handleError } from '../../functions/handle-error.function';
import { OrderItem } from '../../models/order/order-item.model';
import { OrderItemInterface } from '../../interfaces/order-item.interface';
import { Order } from '../../models/order/order.model';
import { ServerResponse500 } from '../../classes/server-response-500.class';
import { ApiResponseInterface } from '../../interfaces/api-response.interface';

export const addOrder = async (req: Request, res: Response): Promise<void> => {
	try {
		const orderItemsIds = Promise.all(
			req.body.orderItems.map(
				async (orderItem: OrderItemInterface): Promise<void> => {
					let newOrderItem = new OrderItem({
						quantity: orderItem.quantity,
						product: orderItem.product,
					});

					newOrderItem = await newOrderItem.save();

					return newOrderItem.id;
				}
			)
		);

		const orderItemsIdsResolved = await orderItemsIds;

		let order = new Order({
			...req.body,
			orderItems: orderItemsIdsResolved,
		});

		order = await order.save();

		if (!order) {
			res
				.status(500)
				.send(new ServerResponse500('Category cannot be created.'));
			return;
		}

		const response: ApiResponseInterface = {
			success: true,
			message: 'Order created successfully.',
			payload: order,
		};

		res.status(200).json(response);
	} catch (error: unknown) {
		handleError(res, error);
	}
};
