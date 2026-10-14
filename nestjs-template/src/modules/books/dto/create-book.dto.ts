import {
    IsString,
    IsOptional,
    IsInt,
    Min,
    MaxLength
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateBookDto {
    @ApiProperty({example: 'Hobit'})
    @IsString()
    @MaxLength(255)
    title: string;

    @ApiProperty({example: 'J.R.R. Tolkien'})
    @IsString()
    @MaxLength(255)
    author: string;

    @ApiProperty({example: 1937, required: false})
    @IsOptional()
    @IsInt()
    @Min(0)
    publishedYear?: number;
}
