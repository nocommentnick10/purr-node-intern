import { ApiProperty } from "@nestjs/swagger";

export class UpdateColumnDto {
    @ApiProperty({example: 1})
    readonly id: number;
    @ApiProperty({example: 1})
    readonly userId: number;
    @ApiProperty({example: 'Updated column title'})
    title: string;
}