import { ApiProperty } from "@nestjs/swagger";

export class UpdateColumnDto {
    @ApiProperty({example: 'Updated column title'})
    title: string;
}