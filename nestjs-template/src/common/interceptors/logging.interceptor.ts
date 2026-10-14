import {
    CallHandler,
    ExecutionContext,
    Injectable,
    Logger,
    NestInterceptor,
}                        from '@nestjs/common';
import {
    Observable,
    tap
}                        from 'rxjs';
import type {
    FastifyReply,
    FastifyRequest
}                        from 'fastify';
import { LoggerService } from "../../modules/logger/logger.service";

//Logs every successful request (errors are logged by AllExceptionsFilter)
@Injectable()
export class LoggingInterceptor implements NestInterceptor {
    private readonly consoleLogger = new Logger('HTTP');

    constructor(private readonly logger: LoggerService) {
    }

    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const req                                = context.switchToHttp().getRequest<FastifyRequest>();
        const res                                = context.switchToHttp().getResponse<FastifyReply>();
        const {method, url, params, query, body} = req;
        const start                              = Date.now();

        return next.handle().pipe(
            tap((data) => {
                const duration = Date.now() - start;
                // Not awaited - the response doesn't wait for the DB log
                void this.logger.logRequest({
                    method,
                    url,
                    body:       body ? JSON.stringify(body) : null,
                    query:      query ? JSON.stringify(query) : null,
                    params:     params ? JSON.stringify(params) : null,
                    response:   data ? JSON.stringify(data) : null,
                    statusCode: res.statusCode,
                });
                this.consoleLogger.log(`[${method}] ${url} ${res.statusCode} - ${duration}ms`);
            }),
        );
    }
}
