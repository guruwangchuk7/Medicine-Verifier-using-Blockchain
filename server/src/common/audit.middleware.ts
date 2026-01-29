
import { Injectable, NestMiddleware, Logger } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class AuditMiddleware implements NestMiddleware {
    private readonly logger = new Logger('AuditTrail');

    use(req: Request, res: Response, next: NextFunction) {
        const { method, originalUrl, body, ip } = req;

        // Only log write actions (POST, PUT, DELETE, PATCH)
        if (['POST', 'PUT', 'PATCH', 'DELETE'].includes(method)) {
            res.on('finish', () => {
                const { statusCode } = res;
                if (statusCode >= 200 && statusCode < 300) {
                    this.logger.log(
                        `ACTION: ${method} ${originalUrl} | USER: ${req.user ? (req.user as any).email : 'Anonymous'} | IP: ${ip} | STATUS: ${statusCode}`
                    );
                    // In production, save this to the DB Audit Table
                } else {
                    this.logger.warn(
                        `FAILED ACTION: ${method} ${originalUrl} | IP: ${ip} | STATUS: ${statusCode}`
                    );
                }
            });
        }

        next();
    }
}
