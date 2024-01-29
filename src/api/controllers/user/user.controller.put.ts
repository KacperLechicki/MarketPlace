import { Request, Response } from 'express';
import { handleError } from '../../functions/handle-error.function';
import { ApiResponseInterface } from '../../interfaces/api-response.interface';
import { User } from '../../models/user/user.model';

/**
 * Update existing user.
 */
export const updateUser = async (
	req: Request,
	res: Response
): Promise<void> => {
	/*
		#swagger.summary = 'Update existing user.'
        #swagger.parameters['auth'] = { description: 'A variable that stores part of the url.' }
        #swagger.parameters['id'] = { description: 'Id of user.' }
	*/

	/*
		#swagger.parameters['body'] = {
            in: 'body',
            description: 'User data.',
            required: false,
            schema: {
                name: 'User name',
                email: 'User email',
                phone: '111 222 333',
                password: 'User password',
				address: {
					street: 'Street name',
					apartment: 'Apartment number',
					city: 'City name',
					zip: 'Zip code',
					country: 'Country name'
				},
				}
            }
        }
	*/

	try {
		/*
			#swagger.responses[400] = {
				schema: { 
					success: false,
					message: 'User ID is required.',
					payload: 'null',
				},
			}
		*/

		// Check if the user ID is provided
		if (!req.params.id) {
			res.status(400).json({
				success: false,
				message: 'User ID is required.',
				payload: null,
			});
			return;
		}

		// Remove the isAdmin field from the request body to prevent unauthorized privilege escalation
		const { isAdmin, ...bodyWithoutAdmin } = req.body;

		/*
			#swagger.responses[400] = {
				schema: { 
					success: false,
					message: 'Password cannot be changed.',
					payload: 'null',
				},
			}
		*/

		if ('password' in bodyWithoutAdmin) {
			res.status(400).json({
				success: false,
				message: 'Password cannot be changed.',
				payload: null,
			});
			return;
		}

		// Find the user by ID and update it with the new data
		const user = await User.findByIdAndUpdate(
			req.params.id,
			{
				...bodyWithoutAdmin,
			},
			{ new: true, runValidators: true }
		);

		/*
			#swagger.responses[404] = {
				schema: { 
					success: false,
					message: 'User not found.',
					payload: 'null',
				},
			}
		*/

		// If the user is not found, return a 404 response
		if (!user) {
			const response: ApiResponseInterface = {
				success: false,
				message: 'User not found.',
				payload: null,
			};

			res.status(404).json(response);
			return;
		}

		// If the user is found and updated, return the updated user data (without the password) in the response
		const userObject = user.toObject();
		const { password, ...userWithoutPassword } = userObject;

		/*
			#swagger.responses[200] = {
				schema: { 
					success: true,
					message: 'User updated successfully.',
					payload: '{ updatedUser }',
				},
			}
		*/

		const response: ApiResponseInterface = {
			success: true,
			message: 'User updated successfully.',
			payload: { updatedUser: userWithoutPassword },
		};

		res.status(200).json(response);
	} catch (error: unknown) {
		// If an error occurs, handle it
		handleError(res, error);
	}
};
