import { handleError } from '../../functions/handle-error.function';
import { ApiResponseInterface } from '../../interfaces/api-response.interface';
import { Category } from '../../models/category/category.model';
import { Request, Response } from 'express';

/**
 * Update existing category.
 */
export const updateCategory = async (
	req: Request,
	res: Response
): Promise<void> => {
	/*
		#swagger.summary = 'Update existing category.'
        #swagger.parameters['api'] = { description: 'A variable that stores part of the url.' }
        #swagger.parameters['id'] = { description: 'Id of category.' }
	*/

	/*
		#swagger.parameters['body'] = {
            in: 'body',
            description: 'Category data.',
            required: false,
            schema: {
                name: "Category name",
                icon: "Icon",
                color: "#000000",
            }
        }
	*/

	try {
		// Try to find the category by its ID and update it with the data from the request body
		// The options { new: true, runValidators: true } ensure that the updated category is returned and that the update data is validated
		const category = await Category.findByIdAndUpdate(
			req.params.id,
			{
				...req.body,
			},
			{ new: true, runValidators: true }
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
                    message: 'Category updated successfully.',
                    payload: '{ category }',
                },
            }
		*/

		// If the category was found and updated, return a success response
		const response: ApiResponseInterface = {
			success: true,
			message: 'Category updated successfully.',
			payload: { category }, // Return the updated category
		};

		// Send the response with a 200 status code
		res.status(200).json(response);
	} catch (error: unknown) {
		// If an error occurred while trying to update the category, handle it
		handleError(res, error);
	}
};
