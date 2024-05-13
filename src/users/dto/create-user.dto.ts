import { ApiProperty } from "@nestjs/swagger";
import{ IsEmail, IsString, IsNotEmpty, IsStrongPassword, MaxLength } from 'class-validator';

export class CreateUserDto {
    @ApiProperty({example: 'kalinovne@gmail.com'})
    @IsNotEmpty()
    @IsString()
    @IsEmail()
    @MaxLength(255)
    readonly email: string;
    @ApiProperty({example: 'password'})
    @IsNotEmpty()
    @IsString()
    @IsStrongPassword()
    @MaxLength(255)
    readonly password: string;
}