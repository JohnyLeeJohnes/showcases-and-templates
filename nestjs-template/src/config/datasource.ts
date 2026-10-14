import { DataSource } from 'typeorm';
import * as dotenv    from 'dotenv';
import { Book }       from "../modules/books/book.entity";
import { Log }        from "../modules/logger/log.entity";

//Load env file variables
dotenv.config({quiet: true});

//Create datasource for Migrations & Seeding
export default new DataSource({
    type:        'mysql',
    host:        process.env.DATABASE_HOST,
    port:        Number(process.env.DATABASE_PORT || 3306),
    username:    process.env.DATABASE_USERNAME,
    password:    process.env.DATABASE_PASSWORD,
    database:    process.env.DATABASE_NAME,
    timezone:    'Z',
    entities:    [Book, Log],
    migrations:  ['./src/database/migrations/*.{ts,js}'],
    synchronize: false,
    logging:     false,
});