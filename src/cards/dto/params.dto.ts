import { ApiProperty } from "@nestjs/swagger";

export class ParamsCardDto {
    @ApiProperty({example: '1'})
    id: number;
    @ApiProperty({example: '1'})
    cardId: number;
}