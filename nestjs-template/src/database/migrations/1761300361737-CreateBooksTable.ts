import {
    MigrationInterface,
    QueryRunner,
    Table
} from "typeorm";

export class CreateBooksTable1761300361737 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name:    'books',
                columns: [
                    {
                        name:               'id',
                        type:               'int',
                        isPrimary:          true,
                        isGenerated:        true,
                        generationStrategy: 'increment',
                    },
                    {
                        name:       'title',
                        type:       'varchar',
                        isNullable: false,
                    },
                    {
                        name:       'author',
                        type:       'varchar',
                        isNullable: false,
                    },
                    {
                        name:       'publishedYear',
                        type:       'int',
                        isNullable: true,
                    },
                    {
                        name:    'createdAt',
                        type:    'timestamp',
                        default: 'CURRENT_TIMESTAMP',
                    },
                    {
                        name:     'updatedAt',
                        type:     'timestamp',
                        default:  'CURRENT_TIMESTAMP',
                        onUpdate: 'CURRENT_TIMESTAMP',
                    },
                ],
            }),
            true,
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('books');
    }
}
