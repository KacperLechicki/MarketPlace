import { Request, Response } from 'express';
import { handleError } from '../../functions/handle-error.function';
import { OrderItem } from '../../models/order/order-item.model';
import { OrderItemInterface } from '../../interfaces/order-item/order-item.interface';
import { Order } from '../../models/order/order.model';
import { ServerResponse500 } from '../../classes/server-response-500.class';
import { ApiResponseInterface } from '../../interfaces/api-response/api-response.interface';

/**
 * Add new order.
 */
export const addOrder = async (req: Request, res: Response): Promise<void> => {
	/*
		#swagger.summary = 'Add new order.'
        #swagger.parameters['api'] = { description: 'A variable that stores part of the url.' }
	*/

	/*
		#swagger.parameters['body'] = {
            in: 'body',
            description: 'Order data.',
            required: true,
            schema: {
                "orderItems": [
					{
						"product": "productID",
						"quantity": 2
					}
			],
			"shippingAddress1": "Addres 1/4",
			"city": "London2",
			"zip": "888-123",
			"country": "UK2",
			"phone": "111 222 333",
			"totalPrice": 123,
			"user": "UserID"
            }
        }  
	*/

	try {
		// Check if orderItems is provided in the request body
		if (!req.body.orderItems) {
			res.status(400).send({ message: 'Order items are required.' });
			return;
		}

		// Map through the orderItems in the request body
		// For each orderItem, create a new OrderItem and save it to the database
		// Return an array of the saved OrderItem ids
		const orderItemsIds = Promise.all(
			req.body.orderItems.map(
				async (orderItem: OrderItemInterface): Promise<void> => {
					// Check if quantity and product are provided for each orderItem
					if (!orderItem.quantity || !orderItem.product) {
						res.status(400).send({
							message: 'Quantity and product are required for each order item.',
						});
						return;
					}

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

		// Map through the array of resolved order item IDs
		const totalPrices = await Promise.all(
			orderItemsIdsResolved.map(async (orderItemId: number) => {
				// For each order item ID, find the corresponding order item in the database
				// Populate the 'product' field of the order item to include the product's price
				const orderItem = (await OrderItem.findById(orderItemId).populate({
					path: 'product',
					populate: 'price',
				})) as OrderItemInterface & { product: { price: number } };

				console.log(orderItem);

				// Calculate the total price for this order item (product price * quantity)
				const totalPrice = orderItem.product.price * orderItem.quantity;

				console.log(totalPrice);

				// Return the total price for this order item
				return totalPrice;
			})
		);

		// Reduce the array of total prices for each order item to a single total price for the entire order
		const totalPrice = totalPrices.reduce(
			(a: number, b: number): number => a + b,
			0
		);

		// Create a new Order with the data from the request body and the ids of the saved OrderItems
		let order = new Order({
			...req.body,
			totalPrice: totalPrice,
			orderItems: orderItemsIdsResolved,
		});

		// Save the new Order to the database
		order = await order.save();

		// If the order was not created, return a 500 response
		if (!order) {
			/*
				#swagger.responses[500] = {
					schema: { 
						success: false,
						message: 'Order cannot be created.',
						payload: 'null',
					},
				}
			*/

			res.status(500).send(new ServerResponse500('Order cannot be created.'));
			return;
		}

		/*
			#swagger.responses[201] = {
                schema: { 
                    success: true,
                    message: 'Order created successfully.',
                    payload: '{ order }',
                },
            }
		*/

		// If the order was saved successfully, return a success response with the saved order
		const response: ApiResponseInterface = {
			success: true,
			message: 'Order created successfully.',
			payload: { order },
		};

		// Send the response with a 201 status code
		res.status(201).json(response);
	} catch (error: unknown) {
		// If an error occurred while trying to save the order, handle it
		handleError(res, error);
	}
};
