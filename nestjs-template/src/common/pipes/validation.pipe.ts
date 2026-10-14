import {
    Injectable,
    ValidationPipe,
    ValidationError,
    BadRequestException
} from '@nestjs/common';

@Injectable()
export class GlobalValidationPipe extends ValidationPipe {
    constructor() {
        super({
            whitelist:            true,
            forbidNonWhitelisted: true,
            transform:            true,
            transformOptions:     {enableImplicitConversion: true},
            exceptionFactory:     (errors: ValidationError[]) => {
                const formatted = errors.flatMap(err => {
                    if (!err.constraints) return [];
                    return Object.values(err.constraints).map(msg => ({field: err.property, message: msg}));
                });
                return new BadRequestException(formatted);
            },
        });
    }
}