import { ApiProperty } from "@nestjs/swagger";

export class GetColumnDto {
    @ApiProperty({example: '1'})
    readonly id: number;
    @ApiProperty({example: '1'})
    readonly userId: number;
    @ApiProperty({example: 'Column title'})
    title: string;
}