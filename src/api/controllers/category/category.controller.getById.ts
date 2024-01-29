import { handleError } from '../../functions/handle-error.function';
import { ApiResponseInterface } from '../../interfaces/api-response/api-response.interface';
import {
	Category,
	categoryDetailsAttributes,
} from '../../models/category/category.model';
import { Request, Response } from 'express';

/**
 * Get category by ID.
 */
export const getCategoryById = async (
	req: Request,
	res: Response
): Promise<void> => {
	/*
		#swagger.summary = 'Get category by ID.'
        #swagger.parameters['api'] = { description: 'A variable that stores part of the url.' }
        #swagger.parameters['id'] = { description: 'Id of category.' }
	*/

	try {
		// Try to find the category by its ID and select only the attributes defined in categoryDetailsAttributes
		const category = await Category.findById(req.params.id).select(
			categoryDetailsAttributes
		);

		// If the category was not found, return a 404 response
		if (!category) {
			/*
				#swagger.responses[404] = {
					schema: { 
						success: false,
						message: 'Category not found.',
						payload: 'null',
					},
				}
			*/

			const response: ApiResponseInterface = {
				success: false,
				message: 'Category not found.',
				payload: null,
			};

			res.status(404).json(response);
			return;
		}

		/*
			#swagger.responses[200] = {
                schema: { 
                    success: true,
                    message: 'Category retrieved successfully.',
                    payload: '{ category }',
                },
            }
		*/

		// If the category was found, return a success response with the category
		const response: ApiResponseInterface = {
			success: true,
			message: 'Category retrieved successfully.',
			payload: { category },
		};

		res.status(200).json(response);
	} catch (error) {
		// If an error occurred while trying to retrieve the category, handle it
		handleError(res, error);
	}
};
