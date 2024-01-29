import { Request, Response } from 'express';
import { handleError } from '../../functions/handle-error.function';
import { Order, orderDetailsAttributes } from '../../models/order/order.model';
import { ApiResponseInterface } from '../../interfaces/api-response/api-response.interface';

/**
 * Get order by ID.
 */
export const getOrderById = async (
	req: Request,
	res: Response
): Promise<void> => {
	/*
		#swagger.summary = 'Get order by ID.'
        #swagger.parameters['api'] = { description: 'A variable that stores part of the url.' }
        #swagger.parameters['id'] = { description: 'Id of order.' }
	*/

	try {
		// Try to find the order by its ID and select only the attributes defined in orderDetailsAttributes
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

		// If the order was not found, return a 404 response
		if (!order) {
			/*
				#swagger.responses[404] = {
					schema: { 
						success: false,
						message: 'Order not found.',
						payload: 'null',
					},
				}
			*/

			const response: ApiResponseInterface = {
				success: false,
				message: 'Order not found.',
				payload: null,
			};

			res.status(404).json(response);
		}

		/*
			#swagger.responses[200] = {
                schema: { 
                    success: true,
                    message: 'Order retrieved successfully.',
                    payload: '{ order }',
                },
            }
		*/

		// If the order was found, return a success response with the order
		const response: ApiResponseInterface = {
			success: true,
			message: 'Order retrieved successfully.',
			payload: { order },
		};

		res.status(200).json(response);
	} catch (error: unknown) {
		handleError(res, error);
	}
};
