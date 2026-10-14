import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigService }        from '@nestjs/config';

//Database connection - values come from .env (validated in env.config.ts)
export const ormConfig = (config: ConfigService): TypeOrmModuleOptions => ({
    type:             'mysql',
    host:             config.get<string>('DATABASE_HOST'),
    port:             config.get<number>('DATABASE_PORT'),
    username:         config.get<string>('DATABASE_USERNAME'),
    password:         config.get<string>('DATABASE_PASSWORD'),
    database:         config.get<string>('DATABASE_NAME'),
    //MySQL stores dates in UTC - without this they would be shifted by your local timezone
    timezone:         'Z',
    //Entities registered with TypeOrmModule.forFeature() are loaded automatically
    autoLoadEntities: true,
    synchronize:      false,
    logging:          false,
});
