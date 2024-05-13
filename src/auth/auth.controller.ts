import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { AuthService } from './auth.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthResponseDto } from './dto/auth.dto';
import { LoginUserDto } from './dto/login.dto';

@ApiTags('authentification')
@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService){

    }

    @ApiOperation({summary: 'Login user'})
    @ApiResponse({status: 200, type: AuthResponseDto})
    @Post('login')
    login(@Body() userDto: LoginUserDto){
        return this.authService.login(userDto);
    }

    @ApiOperation({summary: 'Register user'})
    @ApiResponse({status: 200, type: AuthResponseDto})
    @Post('register')
    register(@Body() userDto: CreateUserDto){
        return this.authService.register(userDto);
    }
}
