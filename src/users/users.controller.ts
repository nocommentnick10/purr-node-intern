import { Post, Body, Controller, Get, UseGuards, Param, ParseIntPipe } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from './users.model';
import { JWTAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@ApiTags('users')
@Controller('users')
export class UsersController {

    constructor(private usersService: UsersService){

    }
    
    @ApiOperation({summary: 'Create user'})
    @ApiResponse({status: 200, type: User})
    @Post()
    create(@Body() userDto: CreateUserDto){
        return this.usersService.createUser(userDto)
    }

    @ApiOperation({summary: 'Get all users'})
    @ApiResponse({status: 200, type: [User]})
    @UseGuards(JWTAuthGuard)
    @Get()
    getAll(){
        return this.usersService.getAllUsers()
    }

    @ApiOperation({summary: 'Get user by id'})
    @ApiResponse({status: 200, type: User})
    @UseGuards(JWTAuthGuard)
    @Get(':id')
    getUserById(@Param('id', ParseIntPipe) id: number): Promise<User>{
        return this.usersService.getUserById(id);
    }
}
