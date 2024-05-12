import { ApiProperty } from "@nestjs/swagger";

export class GetCommentsDto {
    @ApiProperty({example: 1})
    readonly cardId: number;
}