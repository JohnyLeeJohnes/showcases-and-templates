import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity({name: 'books'})
export class Book {
    @ApiProperty()
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty({example: 'Clean Code'})
    @Column()
    title: string;

    @ApiProperty({example: 'Robert C. Martin'})
    @Column()
    author: string;

    @ApiProperty({example: 2008, required: false})
    @Column({nullable: true})
    publishedYear: number;

    @ApiProperty()
    @CreateDateColumn()
    createdAt: Date;

    @ApiProperty()
    @UpdateDateColumn()
    updatedAt: Date;
}
