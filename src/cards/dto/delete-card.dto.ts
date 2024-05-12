import { ApiProperty } from "@nestjs/swagger";
import{ IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class DeleteCardDto {
    @ApiProperty({example: 1})
    @IsNotEmpty()
    @IsNumber()
    readonly id: number;
    @ApiProperty({example: 1})
    @IsNotEmpty()
    @IsNumber()
    readonly columnId: number;
}