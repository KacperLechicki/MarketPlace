import { Request, Response } from 'express';
import { handleError } from '../../functions/handle-error.function';
import { Order, orderListAttributes } from '../../models/order/order.model';
import { ApiResponseInterface } from '../../interfaces/api-response.interface';

/**
 * Get all orders.
 */
export const getOrders = async (req: Request, res: Response): Promise<void> => {
	/*
		#swagger.summary = 'Get all orders.'
        #swagger.parameters['api'] = { description: 'A variable that stores part of the url.' }
	*/

	try {
		// Try to find all orders
		// Select only the attributes defined in orderListAttributes
		// Populate the 'user' field to include user details
		// Sort the orders by the 'dateOrdered' field in descending order
		const orderList = await Order.find()
			.select(orderListAttributes)
			.populate('user')
			.sort({ dateOrdered: -1 });

		// If no orders were found, return a success response with an empty array
		if (!orderList || orderList.length === 0) {
			/*
				#swagger.responses[404] = {
					schema: { 
						success: false,
						message: 'Orders not found.',
						payload: '{ orderList: [] }',
					},
				}
			*/

			const response: ApiResponseInterface = {
				success: false,
				message: 'Orders not found.',
				payload: { orderList: [] },
			};

			res.status(404).json(response);
			return;
		}

		/*
			#swagger.responses[200] = {
                schema: { 
                    success: true,
                    message: 'Orders retrieved successfully.',
                    payload: '{ orderList }',
                },
            }
		*/

		// If orders were found, return a success response with the list of orders
		const response: ApiResponseInterface = {
			success: true,
			message: 'Orders retrieved successfully',
			payload: { orderList },
		};

		// Send the response with a 200 status code
		res.status(200).json(response);
	} catch (error: unknown) {
		// If an error occurred while trying to retrieve the orders, handle it
		handleError(res, error);
	}
};
