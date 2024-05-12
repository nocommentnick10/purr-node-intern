import { ApiProperty } from "@nestjs/swagger";
import { IsJWT } from 'class-validator';

export class AuthResponseDto {
    @ApiProperty({example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwiZW1haWwiOiJ0ZXN0VXNlcjJAZW1haWwuY29tIiwiaWF0IjoxNzE1MjcyNzI1LCJleHAiOjE3MTUzNTkxMjV9.rNj1mPr0GyNLjRbq6Z1atyTfBRsW5PNCpgp5mSTrgB4'})
    @IsJWT()
    token: string;
}