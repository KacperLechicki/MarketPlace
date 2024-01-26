import { handleError } from '../../functions/handle-error.function';
import { ApiResponseInterface } from '../../interfaces/api-response.interface';
import { Category } from '../../models/category/category.model';
import { Request, Response } from 'express';

export const updateCategory = async (
	req: Request,
	res: Response
): Promise<void> => {
	try {
		/* 
			#swagger.summary = 'Update existing category.'
			#swagger.parameters['api'] = { description: 'A variable that stores part of the url.' }
			#swagger.parameters['id'] = { description: 'Id of category.' }

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

			#swagger.responses[200] = {
				schema: { 
					success: true,
					message: 'Category updated successfully.',
					payload: 'null',
				},
			}
			
			#swagger.responses[404] = {
				schema: { 
					success: false,
					message: 'Category not found.',
					payload: 'null',
				},
			} 
		*/

		const category = await Category.findByIdAndUpdate(
			req.params.id,
			{
				...req.body,
			},
			{ new: true, runValidators: true }
		);

		if (!category) {
			const response: ApiResponseInterface = {
				success: false,
				message: 'Category not found.',
				payload: null,
			};

			res.status(404).json(response);
			return;
		}

		const response: ApiResponseInterface = {
			success: true,
			message: 'Category updated successfully.',
			payload: null,
		};

		res.status(200).json(response);
	} catch (error: unknown) {
		handleError(res, error);
	}
};
