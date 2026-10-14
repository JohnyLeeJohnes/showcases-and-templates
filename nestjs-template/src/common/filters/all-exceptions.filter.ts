import {
    ArgumentsHost,
    Catch,
    ExceptionFilter,
    HttpException,
    HttpStatus,
    Logger,
}                          from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import type {
    FastifyReply,
    FastifyRequest
}                          from 'fastify';
import { LoggerService }   from "../../modules/logger/logger.service";

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
    private readonly logger = new Logger(AllExceptionsFilter.name);

    constructor(
        private readonly adapterHost: HttpAdapterHost,
        private readonly databaseLogger?: LoggerService,
    ) {
    }

    async catch(exception: unknown, host: ArgumentsHost) {
        const {httpAdapter} = this.adapterHost;
        const ctx      = host.switchToHttp();
        const response = ctx.getResponse<FastifyReply>();
        const request  = ctx.getRequest<FastifyRequest>();
        const status   = exception instanceof HttpException
            ? exception.getStatus()
            : HttpStatus.INTERNAL_SERVER_ERROR;
        const message  = exception instanceof HttpException
            ? exception.getResponse()
            : (exception instanceof Error && exception.message) || 'Internal server error';

        const payload = {
            success:    false,
            statusCode: status,
            message,
            timestamp:  new Date().toISOString(),
            url:        request.url,
        };

        // Log to DB if available
        if (this.databaseLogger) {
            await this.databaseLogger.logError({
                method:       request.method,
                url:          request.url,
                body:         JSON.stringify(request.body || {}),
                query:        JSON.stringify(request.query || {}),
                params:       JSON.stringify(request.params || {}),
                errorMessage: typeof message === 'string' ? message : JSON.stringify(message),
                statusCode:   status,
            });
        }

        this.logger.error(`${request.method} ${request.url} -> ${JSON.stringify(message)}`);

        httpAdapter.reply(response, payload, status);
    }
}
