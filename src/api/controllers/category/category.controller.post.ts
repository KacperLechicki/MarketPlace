import { ServerResponse500 } from '../../classes/server-response-500.class';
import { handleError } from '../../functions/handle-error.function';
import { ApiResponseInterface } from '../../interfaces/api-response/api-response.interface';
import { Category } from '../../models/category/category.model';
import { Request, Response } from 'express';

/**
 * Add new category.
 */
export const addCategory = async (
	req: Request,
	res: Response
): Promise<void> => {
	/*
		#swagger.summary = 'Add new category.'
        #swagger.parameters['api'] = { description: 'A variable that stores part of the url.' }
	*/

	/*
		#swagger.parameters['body'] = {
            in: 'body',
            description: 'Category data.',
            required: true,
            schema: {
                name: "Category name",
                icon: "Icon",
                color: "#000000",
            }
        }  
	*/

	try {
		// Create a new Category instance with the data from the request body
		let category = new Category({
			...req.body,
		});

		// Try to save the new category to the database
		const createdCategory = await category.save();

		// If the category was not created, return a 500 response
		if (!createdCategory) {
			/*
				#swagger.responses[500] = {
					schema: { 
						success: false,
						message: 'Category cannot be created.',
						payload: 'null',
					},
				}
			*/

			res
				.status(500)
				.send(new ServerResponse500('Category cannot be created.'));
			return;
		}

		/*
			#swagger.responses[201] = {
                schema: { 
                    success: true,
                    message: 'Category created successfully.',
                    payload: '{ createdCategory }',
                },
            }
		*/

		// If the category was created, return a success response with the created category
		const response: ApiResponseInterface = {
			success: true,
			message: 'Category created successfully.',
			payload: { createdCategory },
		};

		// Send the response with a 201 status code, indicating that a new resource was created
		res.status(201).json(response);
	} catch (error: unknown) {
		// If an error occurred while trying to create the category, handle it
		handleError(res, error);
	}
};
