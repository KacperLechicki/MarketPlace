import { Request, Response } from 'express';
import { handleError } from '../../functions/handle-error.function';
import { ApiResponseInterface } from '../../interfaces/api-response/api-response.interface';
import { Category } from '../../models/category/category.model';

/**
 * Get categories count.
 */
export const getCategoriesCount = async (
	req: Request,
	res: Response
): Promise<void> => {
	/*
		#swagger.summary = 'Get categories count.'
        #swagger.parameters['api'] = { description: 'A variable that stores part of the url.' }
	*/

	try {
		// Try to count all categories in the database
		const categoriesCount = await Category.countDocuments({});

		// If no categories were found, return a 404 response with a message indicating that no categories were found
		if (!categoriesCount) {
			/*
				#swagger.responses[404] = {
					schema: { 
						success: false,
						message: 'Categories not found.',
						payload: '{ categoriesCount: 0 }',
					},
				}
			*/

			const response: ApiResponseInterface = {
				success: false,
				message: 'Categories not found.',
				payload: { categoriesCount: 0 }, // Return categories count as 0
			};

			// Send the response with a 404 status code
			res.status(404).json(response);
			return;
		}

		/*
			#swagger.responses[200] = {
                schema: { 
                    success: true,
                    message: 'Categories count retrieved successfully.',
                    payload: '{ categoriesCount }',
                },
            }
		*/

		// If categories were found, return a success response with the count of categories
		const response: ApiResponseInterface = {
			success: true,
			message: 'Categories count retrieved successfully.',
			payload: { categoriesCount }, // Return the count of categories
		};

		// Send the response with a 200 status code
		res.status(200).send(response);
	} catch (error: unknown) {
		// If an error occurred while trying to count the categories, handle it
		handleError(res, error);
	}
};
