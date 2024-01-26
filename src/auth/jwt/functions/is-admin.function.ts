import { Request } from 'express';

export async function isAdmin(
	req: Request,
	token: { payload: { isAdmin: boolean } }
): Promise<boolean> {
	if (!token.payload.isAdmin) {
		return true;
	}

	return false;
}
