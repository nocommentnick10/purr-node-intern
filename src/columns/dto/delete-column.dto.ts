import { ApiProperty } from "@nestjs/swagger";
import{ IsNotEmpty, IsNumber } from 'class-validator';

export class DeleteColumnDto {
    @ApiProperty({example: '1'})
    @IsNotEmpty()
    @IsNumber()
    readonly id: number;
}