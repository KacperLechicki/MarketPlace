import { Request, Response } from 'express';
import { handleError } from '../../functions/handle-error.function';
import { Order } from '../../models/order/order.model';
import { ApiResponseInterface } from '../../interfaces/api-response/api-response.interface';

/**
 * Get all user orders.
 */
export const userOrders = async (
	req: Request,
	res: Response
): Promise<void> => {
	/*
		#swagger.summary = 'Get all user orders.'
		#swagger.parameters['auth'] = { description: 'A variable that stores part of the url.' }
		#swagger.parameters['id'] = { description: 'User ID.' }
	*/

	try {
		// Fetch all user orders and sort by dateCreated
		const userOrderList = await Order.find({ user: req.params.id })
			.populate({
				path: 'orderItems',
				populate: {
					path: 'product',
					populate: 'category',
				},
			})
			.sort({ dateOrdered: -1 });

		// If no user orders are found, return a success response with an empty array
		if (!userOrderList || userOrderList.length === 0) {
			/*
				#swagger.responses[404] = {
					schema: { 
						success: false,
						message: 'User orders not found.',
						payload: '{ userOrderList: [] }',
					},
				}
			*/

			const response: ApiResponseInterface = {
				success: false,
				message: 'User orders not found.',
				payload: { userOrderList: [] },
			};

			res.status(404).json(response);
			return;
		}

		/*
			#swagger.responses[200] = {
				schema: { 
					success: true,
					message: 'User orders retrieved successfully.',
					payload: '{ userOrderList }',
				},
			}
		*/

		// If user orders are found, return a success response with the user orders
		const response: ApiResponseInterface = {
			success: true,
			message: 'User orders retrieved successfully.',
			payload: { userOrderList },
		};

		res.status(200).json(response);
	} catch (error: unknown) {
		// If an error occurs, handle it
		handleError(res, error);
	}
};
