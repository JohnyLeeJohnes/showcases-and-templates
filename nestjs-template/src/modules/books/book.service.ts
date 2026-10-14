import {
    Injectable,
    NotFoundException
}                           from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository }       from 'typeorm';
import { Book }             from './book.entity';
import { CreateBookDto }    from './dto/create-book.dto';
import { UpdateBookDto }    from './dto/update-book.dto';

@Injectable()
export class BookService {
    constructor(
        @InjectRepository(Book) private readonly bookRepo: Repository<Book>,
    ) {
    }

    async create(dto: CreateBookDto) {
        const book  = this.bookRepo.create(dto as Partial<Book>);
        const saved = await this.bookRepo.save(book);
        return {success: true, message: 'Book created successfully', data: saved};
    }

    async findAll() {
        const books = await this.bookRepo.find();
        return {success: true, message: 'Books fetched successfully', data: books};
    }

    async findOne(id: number) {
        const book = await this.bookRepo.findOne({where: {id}});
        if (!book) throw new NotFoundException(`Book with ID ${id} not found`);
        return {success: true, message: 'Book found', data: book};
    }

    async update(id: number, dto: UpdateBookDto) {
        const existing = await this.bookRepo.findOne({where: {id}});
        if (!existing) throw new NotFoundException(`Book with ID ${id} not found`);
        Object.assign(existing, dto);
        const saved = await this.bookRepo.save(existing);
        return {success: true, message: 'Book updated successfully', data: saved};
    }

    async remove(id: number) {
        const existing = await this.bookRepo.findOne({where: {id}});
        if (!existing) throw new NotFoundException(`Book with ID ${id} not found`);
        await this.bookRepo.remove(existing);
        return {success: true, message: 'Book deleted successfully'};
    }
}
