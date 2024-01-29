import { Request, Response } from 'express';
import { handleError } from '../../functions/handle-error.function';
import { Order } from '../../models/order/order.model';
import { ApiResponseInterface } from '../../interfaces/api-response/api-response.interface';

/**
 * Update order status.
 */
export const orderStatus = async (
	req: Request,
	res: Response
): Promise<void> => {
	/*
		#swagger.summary = 'Update order status.'
        #swagger.parameters['api'] = { description: 'A variable that stores part of the url.' }
        #swagger.parameters['id'] = { description: 'Id of order.' }
	*/

	/*
		#swagger.parameters['body'] = {
            in: 'body',
            description: 'Order status.',
            required: false,
            schema: {
                status: "status",
            }
        }
	*/

	try {
		// Try to find the order by its ID and update it with the data from the request body
		// The options { new: true, runValidators: true } ensure that the updated category is returned and that the update data is validated
		const order = await Order.findByIdAndUpdate(
			req.params.id,
			{
				status: req.body.status,
			},
			{ new: true, runValidators: true }
		);

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
			return;
		}

		/*
			#swagger.responses[200] = {
                schema: { 
                    success: true,
                    message: 'Order updated successfully.',
                    payload: '{ order }',
                },
            }
		*/

		// If the order was found and updated, return a success response
		const response: ApiResponseInterface = {
			success: true,
			message: 'Order updated successfully.',
			payload: { order }, // Return the updated order
		};

		// Send the response with a 200 status code
		res.status(200).json(response);
	} catch (error: unknown) {
		// If an error occurred while trying to update the order status, handle it
		handleError(res, error);
	}
};
