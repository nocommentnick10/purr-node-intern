import { ApiProperty } from "@nestjs/swagger";
import{ IsNotEmpty, IsNumber } from 'class-validator';

export class ParamsColDto {
    @ApiProperty({example: '1'})
    id: number;
    @ApiProperty({example: '1'})
    colId: number;
}