import { NotFoundException }  from '@nestjs/common';
import {
    Test,
    TestingModule
}                             from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Book }               from './book.entity';
import { BookService }        from './book.service';

describe('BookService', () => {
    let service: BookService;
    //Fake repository - unit tests don't need a real database
    const bookRepo = {
        create:  jest.fn((dto: Partial<Book>) => dto),
        save:    jest.fn((book: Partial<Book>) => Promise.resolve({id: 1, ...book})),
        find:    jest.fn(),
        findOne: jest.fn(),
        remove:  jest.fn(),
    };

    beforeEach(async () => {
        jest.clearAllMocks();
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                BookService,
                {provide: getRepositoryToken(Book), useValue: bookRepo},
            ],
        }).compile();

        service = module.get(BookService);
    });

    it('creates a book', async () => {
        const result = await service.create({title: 'Dune', author: 'Frank Herbert'});

        expect(bookRepo.save).toHaveBeenCalled();
        expect(result.data).toEqual({id: 1, title: 'Dune', author: 'Frank Herbert'});
    });

    it('throws 404 when the book does not exist', async () => {
        bookRepo.findOne.mockResolvedValue(null);

        await expect(service.findOne(42)).rejects.toThrow(NotFoundException);
    });
});
