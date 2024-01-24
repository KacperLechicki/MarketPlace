import { Response } from "express";

export function handleError(res: Response, error: unknown): void {
    res.status(500).json({
        success: false,
        message: 'An error occurred.',
        error: error,
    });
}