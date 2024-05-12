import { ApiProperty } from "@nestjs/swagger";

export class UpdateCommentDto {
    @ApiProperty({example: 'A new comment title'})
    title: string;
}