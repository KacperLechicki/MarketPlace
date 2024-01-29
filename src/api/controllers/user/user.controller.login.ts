import { Request, Response } from 'express';
import { handleError } from '../../functions/handle-error.function';
import { User } from '../../models/user/user.model';
import bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { ApiResponseInterface } from '../../interfaces/api-response.interface';
require('dotenv/config');

/**
 * Authorize user.
 */
export const login = async (req: Request, res: Response): Promise<void> => {
	/*
		#swagger.summary = 'Authorize user.'
        #swagger.parameters['auth'] = { description: 'A variable that stores part of the url.' }
	*/

	/*
		#swagger.parameters['body'] = {
            in: 'body',
            description: 'User data.',
            required: true,
            schema: {
                email: "User email",
                password: "User password",
            }
        }
	*/

	try {
		// Check if the email and password are provided
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

		// Find the user by email
		const user = await User.findOne({ email: req.body.email });

		// If the user is not found, return a 404 response
		if (!user) {
			/*
				#swagger.responses[404] = {
					schema: { 
						success: false,
						message: 'User not found.',
						payload: 'null',
					},
				}
			*/

			const response: ApiResponseInterface = {
				success: false,
				message: 'User not found.',
				payload: null,
			};

			res.status(404).json(response);
			return;
		}

		// If the user is found, check if the provided password matches the user's password
		if (bcrypt.compareSync(req.body.password, user.password)) {
			/*
				#swagger.responses[200] = {
					schema: { 
						success: true,
						message: 'User logged in successfully.',
						payload: '{ token }',
					},
				}
			*/

			// If the password matches, generate a JWT and return it in the response
			const token = jwt.sign(
				{
					userId: user.id,
					email: user.email,
					isAdmin: user.isAdmin,
				},
				process.env.TOKEN_USER_SEED as string,
				{ expiresIn: '1d' }
			);

			const response: ApiResponseInterface = {
				success: true,
				message: 'User logged in successfully.',
				payload: { token },
			};

			res.status(200).json(response);
			return;
		}

		/*
			#swagger.responses[401] = {
				schema: { 
					success: false,
					message: 'Invalid password or e-mail.',
					payload: 'null',
				},
			}
		*/

		// If the password does not match, return a 401 response
		const response: ApiResponseInterface = {
			success: false,
			message: 'Invalid password or e-mail.',
			payload: null,
		};

		res.status(401).json(response);
	} catch (error: unknown) {
		// If an error occurs, handle it
		handleError(res, error);
	}
};
