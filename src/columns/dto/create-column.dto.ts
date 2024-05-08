import { ApiProperty } from "@nestjs/swagger";

export class CreateColumnDto {
    @ApiProperty({example: '1'})
    readonly userId: number;
    @ApiProperty({example: 'A new column title'})
    title: string;
}