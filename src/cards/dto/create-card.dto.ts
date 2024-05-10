import { ApiProperty } from "@nestjs/swagger";

export class CreateCardDto {
    @ApiProperty({example: 1})
    readonly columnId: number;
    @ApiProperty({example: 'A new card title'})
    title: string;
}