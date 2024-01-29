/**
 * Interface for API responses.
 */
export interface ApiResponseInterface {
	/**
	 * Indicates whether the operation was successful.
	 */
	success: boolean;

	/**
	 * A message providing more details about the operation.
	 */
	message: string;

	/**
	 * The payload of the response. This contains any data that the operation returned.
	 */
	payload: unknown;

	/**
	 * An optional field that contains error information if the operation was unsuccessful.
	 */
	error?: unknown;
}
