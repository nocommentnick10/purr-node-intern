import { ApiProperty } from "@nestjs/swagger";

export class DeleteColumnDto {
    @ApiProperty({example: '1'})
    readonly id: number;
}