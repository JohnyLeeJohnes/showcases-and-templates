import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn
} from 'typeorm';

@Entity({name: 'logs'})
export class Log {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    method: string;

    @Column()
    url: string;

    @Column({type: 'text', nullable: true})
    body: string | null;

    @Column({type: 'text', nullable: true})
    query: string | null;

    @Column({type: 'text', nullable: true})
    params: string | null;

    @Column({type: 'text', nullable: true})
    response: string | null;

    @Column({nullable: true})
    statusCode: number;

    @Column({nullable: true})
    level: string;

    @Column({type: 'text', nullable: true})
    errorMessage: string;

    @CreateDateColumn()
    createdAt: Date;
}