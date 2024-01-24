import { ApiResponseInterface } from '../interfaces/api-response.interface';

export class ServerResponse500 implements ApiResponseInterface {
	public readonly success: boolean;
	public readonly message: string;
	public readonly error: unknown;
	public readonly payload: unknown;

	constructor(error: unknown) {
		this.success = false;
		this.message = 'An error occurred.';
		this.error = error;
		this.payload = null;
	}
}
