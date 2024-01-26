import { Request } from 'express';

export async function isOnlyUser(
	req: Request,
	token: { payload: { userId: string; isAdmin: boolean } }
): Promise<boolean> {
	if (
		token.payload.isAdmin ||
		(!token.payload.isAdmin && token.payload.userId !== req.params.id)
	) {
		return true;
	}

	return false;
}
