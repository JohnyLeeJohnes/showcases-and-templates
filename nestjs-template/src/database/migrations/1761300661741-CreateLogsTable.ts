import {
    MigrationInterface,
    QueryRunner,
    Table
} from "typeorm";

export class CreateLogsTable1761300661741 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name:    'logs',
                columns: [
                    {
                        name:               'id',
                        type:               'int',
                        isPrimary:          true,
                        isGenerated:        true,
                        generationStrategy: 'increment',
                    },
                    {
                        name:       'method',
                        type:       'varchar',
                        isNullable: false,
                    },
                    {
                        name:       'url',
                        type:       'varchar',
                        isNullable: false,
                    },
                    {
                        name:       'body',
                        type:       'text',
                        isNullable: true, // ✅ null allowed
                    },
                    {
                        name:       'query',
                        type:       'text',
                        isNullable: true,
                    },
                    {
                        name:       'params',
                        type:       'text',
                        isNullable: true,
                    },
                    {
                        name:       'response',
                        type:       'text',
                        isNullable: true,
                    },
                    {
                        name:       'statusCode',
                        type:       'int',
                        isNullable: true,
                    },
                    {
                        name:       'level',
                        type:       'varchar',
                        isNullable: true,
                    },
                    {
                        name:       'errorMessage',
                        type:       'text',
                        isNullable: true,
                    },
                    {
                        name:    'createdAt',
                        type:    'timestamp',
                        default: 'CURRENT_TIMESTAMP',
                    },
                ],
            }),
            true,
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('logs');
    }
}
