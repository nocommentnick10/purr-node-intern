import { ApiProperty } from "@nestjs/swagger";
import{ IsString, IsNotEmpty, IsNumber, MaxLength } from 'class-validator';

export class CreateCardDto {
    @ApiProperty({example: 1})
    @IsNotEmpty()
    @IsNumber()
    readonly columnId: number;
    @ApiProperty({example: 'A new card title'})
    @IsNotEmpty()
    @IsString()
    @MaxLength(255)
    title: string;
}