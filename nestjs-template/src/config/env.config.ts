import * as Joi                from 'joi';
import { ConfigModuleOptions } from '@nestjs/config';

//Create global configuration
export const envConfig: ConfigModuleOptions = {
    isGlobal:         true,
    envFilePath:      ['.env'],
    validationSchema: Joi.object({
        //Name of the .env file
        NODE_ENV: Joi.string()
                      .valid('development', 'production', 'test')
                      .default('development'),
        //API
        API_PORT:   Joi.number().default(3000),
        API_PREFIX: Joi.string().required(),
        //Swagger
        SWAGGER_ENABLE:      Joi.number().valid(1, 0).required(),
        SWAGGER_TITLE:       Joi.string().optional(),
        SWAGGER_DESCRIPTION: Joi.string().optional(),
        SWAGGER_PREFIX:      Joi.string().optional(),
        //Database
        DATABASE_HOST:     Joi.string().required(),
        DATABASE_PORT:     Joi.number().default(3306),
        DATABASE_NAME:     Joi.string().required(),
        DATABASE_USERNAME: Joi.string().required(),
        DATABASE_PASSWORD: Joi.string().required(),
    }),
};