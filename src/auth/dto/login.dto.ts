import { ApiProperty } from "@nestjs/swagger";

export class LoginUserDto {
    @ApiProperty({example: 'kalinovne@gmail.com'})
    readonly email: string;

    @ApiProperty({example: 'password123Q!'})
    readonly password: string;
}