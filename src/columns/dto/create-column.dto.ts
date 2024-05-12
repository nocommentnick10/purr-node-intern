import { ApiProperty } from "@nestjs/swagger";
import{ IsString, IsNotEmpty, IsNumber, MaxLength } from 'class-validator';

export class CreateColumnDto {
    @ApiProperty({example: '1'})
    @IsNotEmpty()
    @IsNumber()
    readonly userId: number;
    @ApiProperty({example: 'A new column title'})
    @IsNotEmpty()
    @IsString()
    @MaxLength(255)
    title: string;
}