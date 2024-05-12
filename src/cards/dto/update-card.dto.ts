import { ApiProperty } from "@nestjs/swagger";

export class UpdateCardDto {
    @ApiProperty({example: 'An updated card title'})
    title: string;
}