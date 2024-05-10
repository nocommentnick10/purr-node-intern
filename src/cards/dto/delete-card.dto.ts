import { ApiProperty } from "@nestjs/swagger";

export class DeleteCardDto {
    @ApiProperty({example: 1})
    readonly id: number;
    @ApiProperty({example: 1})
    readonly columnId: number;
}