import { ApiProperty } from "@nestjs/swagger";

export class ParamsColDto {
    @ApiProperty({example: '1'})
    id: number;
    @ApiProperty({example: '1'})
    colId: number;
}