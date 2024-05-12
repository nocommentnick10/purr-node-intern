import { ApiProperty } from "@nestjs/swagger";
import{ IsString, IsNotEmpty, MaxLength } from 'class-validator';

export class UpdateColumnDto {
    @ApiProperty({example: 'Updated column title'})
    @IsNotEmpty()
    @IsString()
    @MaxLength(255)
    title: string;
}