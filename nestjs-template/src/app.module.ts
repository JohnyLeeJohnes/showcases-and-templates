import { Module }        from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService }    from './app.service';
import {
    ConfigModule,
    ConfigService
}                        from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { envConfig }     from "./config/env.config";
import { ormConfig }     from "./config/orm.config";
import { BookModule }    from "./modules/books/book.module";
import { LoggerModule }  from "./modules/logger/logger.module";

@Module({
    imports:     [
        ConfigModule.forRoot(envConfig),
        TypeOrmModule.forRootAsync({
            inject:     [ConfigService],
            useFactory: ormConfig,
        }),
        BookModule,
        LoggerModule,
    ],
    controllers: [AppController],
    providers:   [AppService],
})
export class AppModule {
}
