import { ApiProperty } from "@nestjs/swagger";

export class ParamsCommDto {
    @ApiProperty({example: '1'})
    id: number;
    @ApiProperty({example: '1'})
    commId: number;
}