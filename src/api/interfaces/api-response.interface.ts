export interface ApiResponseInterface {
	success: boolean;
	message: string;
	payload: unknown;
	error?: unknown;
}
