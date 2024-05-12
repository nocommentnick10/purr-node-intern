import { ApiProperty } from "@nestjs/swagger";
import{ IsString, IsNotEmpty, MaxLength } from 'class-validator';

export class UpdateCommentDto {
    @ApiProperty({example: 'A new comment title'})
    @IsNotEmpty()
    @IsString()
    @MaxLength(255)
    title: string;
}