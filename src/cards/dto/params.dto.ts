import { ApiProperty } from "@nestjs/swagger";
import{ IsNotEmpty, IsNumber } from 'class-validator';

export class ParamsCardDto {
    @ApiProperty({example: '1'})
    id: number;
    @ApiProperty({example: '1'})
    cardId: number;
}