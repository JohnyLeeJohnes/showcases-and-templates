import { Injectable }       from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository }       from 'typeorm';
import { Log }              from './log.entity';

@Injectable()
export class LoggerService {
    constructor(
        @InjectRepository(Log) private readonly logRepo: Repository<Log>,
    ) {
    }

    async logRequest(partial: Partial<Log>) {
        try {
            const log = this.logRepo.create({...partial, level: 'info'});
            await this.logRepo.save(log);
        } catch (err) {
            console.error('Failed to write request log to DB:', err);
        }
    }

    async logError(partial: Partial<Log>) {
        try {
            const log = this.logRepo.create({...partial, level: 'error'});
            await this.logRepo.save(log);
        } catch (err) {
            console.error('Failed to write error log to DB:', err);
        }
    }
}
