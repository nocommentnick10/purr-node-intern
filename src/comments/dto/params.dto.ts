import { ApiProperty } from "@nestjs/swagger";
import{ IsNotEmpty, IsNumber } from 'class-validator';

export class ParamsCommDto {
    @ApiProperty({example: '1'})
    id: number;
    @ApiProperty({example: '1'})
    commId: number;
}