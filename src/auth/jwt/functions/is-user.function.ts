import { Request } from 'express';

export async function isUser(
	req: Request,
	token: { payload: { userId: string; isAdmin: boolean } }
): Promise<boolean> {
	if (!token.payload.isAdmin && token.payload.userId !== req.params.id) {
		return true;
	}

	return false;
}
