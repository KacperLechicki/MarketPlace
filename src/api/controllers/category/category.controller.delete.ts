import { handleError } from '../../functions/handle-error.function';
import { ApiResponseInterface } from '../../interfaces/api-response.interface';
import { Category } from '../../models/category/category.model';
import { Request, Response } from 'express';

/**
 * Delete a category by ID.
 */
export const deleteCategory = async (
	req: Request,
	res: Response
): Promise<void> => {
	/*
		#swagger.summary = 'Delete a category by ID.'
        #swagger.parameters['api'] = { description: 'A variable that stores part of the url.' }
        #swagger.parameters['id'] = { description: 'Id of category.' }
	*/

	try {
		// Try to find and delete the category by its ID
		const category = await Category.findByIdAndDelete(req.params.id);

		/*
			#swagger.responses[404] = {
                schema: { 
                    success: false,
                    message: 'Category not found.',
                    payload: 'null',
                },
            }
		*/

		// If the category was not found, return a 404 response
		if (!category) {
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
                    message: 'Category deleted successfully.',
                    payload: 'null',
                },
            }
		*/

		// If the category was found and deleted, return a success response
		const response: ApiResponseInterface = {
			success: true,
			message: 'Category deleted successfully.',
			payload: null,
		};

		res.status(200).json(response);
	} catch (error) {
		// If an error occurred while trying to delete the category, handle it
		handleError(res, error);
	}
};
