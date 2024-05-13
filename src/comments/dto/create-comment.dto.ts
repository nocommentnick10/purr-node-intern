import { ApiProperty } from "@nestjs/swagger";
import{ IsString, IsNotEmpty, IsNumber, MaxLength } from 'class-validator';

export class CreateCommentDto {
    @ApiProperty({example: 1})
    @IsNotEmpty()
    @IsNumber()
    readonly userId: number;
    @ApiProperty({example: 1})
    @IsNotEmpty()
    @IsNumber()
    readonly cardId: number;
    @ApiProperty({example: 'A new comment title'})
    @IsNotEmpty()
    @IsString()
    @MaxLength(255)
    title: string;
}