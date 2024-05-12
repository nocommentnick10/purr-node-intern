import { ApiProperty } from "@nestjs/swagger";
import{ IsString, IsNotEmpty, MaxLength } from 'class-validator';

export class UpdateCardDto {
    @ApiProperty({example: 'An updated card title'})
    @IsNotEmpty()
    @IsString()
    @MaxLength(255)
    title: string;
}