import { Request, Response } from 'express';
import { User } from '../../models/user/user.model';
import { handleError } from '../../functions/handle-error.function';
import bcrypt from 'bcrypt';
import { ServerResponse500 } from '../../classes/server-response-500.class';
import { ApiResponseInterface } from '../../interfaces/api-response/api-response.interface';
require('dotenv/config');

/**
 * Add new user.
 */
export const addUser = async (req: Request, res: Response): Promise<void> => {
	/*
		#swagger.summary = 'Add new user.'
        #swagger.parameters['auth'] = { description: 'A variable that stores part of the url.' }
	*/

	/*
		#swagger.parameters['body'] = {
            in: 'body',
            description: 'User data.',
            required: true,
            schema: {
                name: "User name",
                email: "User email",
                password: "User password",
            }
        }
	*/

	try {
		// Check if the necessary data (email and password) are provided
		if (!req.body.email || !req.body.password) {
			/*
				#swagger.responses[400] = {
					schema: { 
						success: false,
						message: 'Email and password are required.',
						payload: 'null',
					},
				}
			*/

			res.status(400).json({
				success: false,
				message: 'Email and password are required.',
				payload: null,
			});
			return;
		}

		// Check if the password is at least 8 characters long
		if (req.body.password.length < 8) {
			/*
				#swagger.responses[400] = {
					schema: { 
						success: false,
						message: 'Password must be at least 8 characters long.',
						payload: 'null',
					},
				}
			*/

			res.status(400).json({
				success: false,
				message: 'Password must be at least 8 characters long.',
				payload: null,
			});
			return;
		}

		// Check if the password contains at least one special character
		const specialCharacterRegex = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
		if (!specialCharacterRegex.test(req.body.password)) {
			/*
				#swagger.responses[400] = {
					schema: { 
						success: false,
						message: 'Password must contain at least one special character.',
						payload: 'null',
					},
				}
			*/

			res.status(400).json({
				success: false,
				message: 'Password must contain at least one special character.',
				payload: null,
			});
			return;
		}

		// Create a new User instance and hash the password
		let user = new User({
			...req.body,
			password: bcrypt.hashSync(req.body.password, 12),
		});

		// Save the user to the database
		const createdUser = await user.save();

		// If the user cannot be saved, return a 500 error
		if (!createdUser) {
			/*
				#swagger.responses[500] = {
					schema: { 
						success: false,
						message: 'User cannot be created.',
						payload: 'null',
					},
				}
			*/

			res.status(500).json(new ServerResponse500('User cannot be created.'));
			return;
		}

		/*
			#swagger.responses[201] = {
				schema: { 
					success: true,
					message: 'User created successfully.',
					payload: '{ newUser }',
				},
			}
		*/

		// If the user is saved successfully, return the user data (without the password) in the response
		const createdUserObject = createdUser.toObject();
		const { password, ...userWithoutPassword } = createdUserObject;

		const response: ApiResponseInterface = {
			success: true,
			message: 'User created successfully.',
			payload: { newUser: userWithoutPassword },
		};

		res.status(201).json(response);
	} catch (error: unknown) {
		// If an error occurs, handle it
		handleError(res, error);
	}
};
