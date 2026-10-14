import {
    Controller,
    Get,
    Post,
    Body,
    Param,
    Delete,
    Put,
    ParseIntPipe
}                        from '@nestjs/common';
import { BookService }   from './book.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import {
    ApiTags,
    ApiOperation,
    ApiResponse,
    ApiParam,
    ApiBody
}                        from '@nestjs/swagger';

@ApiTags('Books')
@Controller('books')
export class BookController {
    constructor(private readonly bookService: BookService) {
    }

    @Post()
    @ApiOperation({summary: 'Create a new book'})
    @ApiBody({type: CreateBookDto})
    @ApiResponse({status: 201, description: 'Book successfully created'})
    async create(@Body() dto: CreateBookDto) {
        return this.bookService.create(dto);
    }

    @Get()
    @ApiOperation({summary: 'Get all books'})
    @ApiResponse({status: 200, description: 'Returns a list of all books'})
    async findAll() {
        return this.bookService.findAll();
    }

    @Get(':id')
    @ApiOperation({summary: 'Get a book by ID'})
    @ApiParam({name: 'id', type: Number})
    @ApiResponse({status: 200, description: 'Book found'})
    @ApiResponse({status: 404, description: 'Book not found'})
    async findOne(@Param('id', ParseIntPipe) id: number) {
        return this.bookService.findOne(id);
    }

    @Put(':id')
    @ApiOperation({summary: 'Update an existing book by ID'})
    @ApiParam({name: 'id', type: Number})
    @ApiBody({type: UpdateBookDto})
    @ApiResponse({status: 200, description: 'Book updated'})
    @ApiResponse({status: 404, description: 'Book not found'})
    async update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateBookDto) {
        return this.bookService.update(id, dto);
    }

    @Delete(':id')
    @ApiOperation({summary: 'Delete a book by ID'})
    @ApiParam({name: 'id', type: Number})
    @ApiResponse({status: 200, description: 'Book deleted'})
    @ApiResponse({status: 404, description: 'Book not found'})
    async remove(@Param('id', ParseIntPipe) id: number) {
        return this.bookService.remove(id);
    }
}
