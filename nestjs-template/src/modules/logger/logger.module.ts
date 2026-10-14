import { Module }        from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Log }           from './log.entity';
import { LoggerService } from './logger.service';

@Module({
    imports:   [TypeOrmModule.forFeature([Log])],
    providers: [LoggerService],
    exports:   [LoggerService],
})
export class LoggerModule {
}
