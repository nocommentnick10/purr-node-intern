import { ApiProperty } from "@nestjs/swagger";
import{ IsString, IsNotEmpty, IsNumber, MaxLength } from 'class-validator';

export class GetColumnDto {
    @ApiProperty({example: '1'})
    @IsNotEmpty()
    @IsNumber()
    readonly id: number;
    @ApiProperty({example: '1'})
    @IsNotEmpty()
    @IsNumber()
    readonly userId: number;
    @ApiProperty({example: 'Column title'})
    @IsNotEmpty()
    @IsString()
    @MaxLength(255)
    title: string;
}