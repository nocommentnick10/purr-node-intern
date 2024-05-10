import { ApiProperty } from "@nestjs/swagger";

export class UpdateCardDto {
    @ApiProperty({example: 1})
    readonly id: number;
    @ApiProperty({example: 1})
    readonly columnId: number;
    @ApiProperty({example: 'An updated card title'})
    title: string;
}