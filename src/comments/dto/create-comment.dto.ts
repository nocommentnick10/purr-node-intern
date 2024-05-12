import { ApiProperty } from "@nestjs/swagger";

export class CreateCommentDto {
    @ApiProperty({example: 1})
    readonly userId: number;
    @ApiProperty({example: 1})
    readonly cardId: number;
    @ApiProperty({example: 'A new comment title'})
    title: string;
}