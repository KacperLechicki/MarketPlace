import { ApiResponseInterface } from '../interfaces/api-response.interface';

/**
 * This class represents a server response for a 500 error.
 * It implements the ApiResponseInterface.
 */
export class ServerResponse500 implements ApiResponseInterface {
	public readonly success: boolean;
	public readonly message: string;
	public readonly error: unknown;
	public readonly payload: unknown;

	/**
	 * Constructs a new ServerResponse500 object.
	 * @param error - The error that caused the 500 response.
	 */
	constructor(error: unknown) {
		this.success = false;
		this.message = 'An internal server error occurred. Please try again later.';
		this.error = error;
		this.payload = null;
	}
}
