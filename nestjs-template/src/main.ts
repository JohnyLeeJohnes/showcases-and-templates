import { INestApplication } from '@nestjs/common';
import {
    HttpAdapterHost,
    NestFactory
}                           from '@nestjs/core';

import { AppModule }            from "./app.module";
import {
    FastifyAdapter,
    NestFastifyApplication
}                               from "@nestjs/platform-fastify";
import {
    DocumentBuilder,
    SwaggerModule
}                               from "@nestjs/swagger";
import { GlobalValidationPipe } from "./common/pipes/validation.pipe";
import { LoggerService }        from "./modules/logger/logger.service";
import { LoggingInterceptor }   from "./common/interceptors/logging.interceptor";
import { AllExceptionsFilter }  from "./common/filters/all-exceptions.filter";

//REST API default values
const API_DEFAULT_PORT   = 3000;
const API_DEFAULT_PREFIX = '/api/v1';

//Swagger default values
const SWAGGER_DEFAULT_TITLE       = 'Test template API';
const SWAGGER_DEFAULT_DESCRIPTION = 'API template';
const SWAGGER_DEFAULT_PREFIX      = '/api';

//Create swagger & expose it to URL
function createSwagger(app: INestApplication, prefix: string) {
    const options = new DocumentBuilder()
        .setTitle(process.env.SWAGGER_TITLE || SWAGGER_DEFAULT_TITLE)
        .setDescription(process.env.SWAGGER_DESCRIPTION || SWAGGER_DEFAULT_DESCRIPTION)
        .setVersion('1.0')
        .build();

    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup(prefix, app, document);
}

async function bootstrap() {
    const app = await NestFactory.create<NestFastifyApplication>(
        AppModule,
        new FastifyAdapter()
    );

    //In Docker the server must listen on all interfaces, locally only on localhost
    const API_ADDRESS    = process.env.NODE_ENV === 'production' ? '0.0.0.0' : 'localhost';
    const API_PREFIX     = process.env.API_PREFIX || API_DEFAULT_PREFIX;
    const API_PORT       = process.env.API_PORT || API_DEFAULT_PORT;
    const SWAGGER_ENABLE = process.env.SWAGGER_ENABLE === '1';
    const SWAGGER_PREFIX = process.env.SWAGGER_PREFIX || SWAGGER_DEFAULT_PREFIX;

    //Set global API prefix
    app.setGlobalPrefix(API_PREFIX);

    //Create Swagger endpoint
    if (SWAGGER_ENABLE) {
        createSwagger(app, SWAGGER_PREFIX);
    }

    //Load logger from DI
    const logger = app.get(LoggerService);
    //Validating requests for DTOs
    app.useGlobalPipes(new GlobalValidationPipe());
    //Filter for handling & logging exceptions throughout the app
    app.useGlobalFilters(new AllExceptionsFilter(app.get(HttpAdapterHost), logger));
    //Log all the requests activities
    app.useGlobalInterceptors(new LoggingInterceptor(logger));

    //start the server
    await app.listen(API_PORT, API_ADDRESS);
    console.log(`🚀 Application listening on: http://localhost:${API_PORT}${API_PREFIX}`);
    if (SWAGGER_ENABLE) {
        console.log(`📚 Swagger UI available at: http://localhost:${API_PORT}${SWAGGER_PREFIX}`);
    }
}

bootstrap().catch(error => {
    console.error(error);
    process.exit(1);
});
