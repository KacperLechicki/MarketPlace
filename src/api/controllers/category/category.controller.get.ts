import { handleError } from '../../functions/handle-error.function';
import { ApiResponseInterface } from '../../interfaces/api-response/api-response.interface';
import {
	Category,
	categoryListAttributes,
} from '../../models/category/category.model';
import { Request, Response } from 'express';

/**
 * Get all categories.
 */
export const getCategories = async (
	req: Request,
	res: Response
): Promise<void> => {
	/*
		#swagger.summary = 'Get all categories.'
        #swagger.parameters['api'] = { description: 'A variable that stores part of the url.' }
	*/

	try {
		// Fetch all categories from the database and select only the attributes defined in categoryListAttributes
		const categoriesList = await Category.find().select(categoryListAttributes);

		// If no categories were found, return a success response with a message indicating that no categories were found
		if (!categoriesList || categoriesList.length === 0) {
			/*
				#swagger.responses[404] = {
					schema: { 
						success: false,
						message: 'Categories not found.',
						payload: '{ categoriesList: [] }',
					},
				}
			*/

			const response: ApiResponseInterface = {
				success: false,
				message: 'Categories not found.',
				payload: { categoriesList: [] },
			};

			// Send the response with a 404 status code
			res.status(404).json(response);
			return;
		}

		/*
			#swagger.responses[200] = {
				schema: { 
					success: true,
					message: 'Categories retrieved successfully.',
					payload: '{ categoriesList }',
				},
			}
		*/

		// If categories were found, return a success response with the categories
		const response: ApiResponseInterface = {
			success: true,
			message: 'Categories retrieved successfully.',
			payload: { categoriesList },
		};

		// Send the response with a 200 status code
		res.status(200).json(response);
	} catch (error) {
		// If an error occurred while trying to retrieve the categories, handle it
		handleError(res, error);
	}
};
