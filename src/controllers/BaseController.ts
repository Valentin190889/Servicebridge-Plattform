import { Request, Response } from 'express';

export class BaseController {
    protected async handleRequest<T>(
        res: Response,
        action: () => Promise<T>
    ): Promise<Response> {
        try {
            const result = await action();
            return res.json(result);
        } catch (error) {
            console.error('Error:', error);
            return res.status(500).json({
                error: 'Internal server error',
                message: error instanceof Error ? error.message : 'Unknown error'
            });
        }
    }

    protected sendError(res: Response, status: number, message: string): Response {
        return res.status(status).json({ error: message });
    }

    protected sendSuccess<T>(res: Response, data: T): Response {
        return res.json(data);
    }

    protected sendCreated(res: Response, data: any = null, message: string = 'Created successfully') {
        return res.status(201).json({
            success: true,
            message,
            data
        });
    }

    protected sendNotFound(res: Response, message: string = 'Resource not found') {
        return res.status(404).json({
            success: false,
            message
        });
    }
} 