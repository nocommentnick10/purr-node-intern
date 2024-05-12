import { ApiProperty } from "@nestjs/swagger";
import{ IsNotEmpty, IsNumber } from 'class-validator';

export class GetCommentsDto {
    @ApiProperty({example: 1})
    @IsNotEmpty()
    @IsNumber()
    readonly cardId: number;
}