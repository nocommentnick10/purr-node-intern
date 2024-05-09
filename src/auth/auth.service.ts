import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcryptjs';
import { User } from 'src/users/users.model';

@Injectable()
export class AuthService {

    constructor(private userService: UsersService,
        private jwtService: JwtService){

    }

    async login(userDto: CreateUserDto){
        const user = await this.validateUser(userDto);
        return this.generateToken(user);
    }

    async register(userDto: CreateUserDto){
        const candidate = await this.userService.getUsersByEmail(userDto.email);

        if (candidate){
            throw new HttpException('This email is already taken', HttpStatus.BAD_REQUEST);
        }

        const hashPassword = await bcrypt.hash(userDto.password, 5);

        const user = await this.userService.createUser({...userDto, password: hashPassword});

        return this.generateToken(user);
    }

    private async generateToken(user: User){
        const payload = {
            id: user.id,
            email: user.email
        };

        return {
            token: this.jwtService.sign(payload)
        }
    }

    private async validateUser(userDto: CreateUserDto){
        const user = await this.userService.getUsersByEmail(userDto.email);

        const passwordEquals = await bcrypt.compare(userDto.password, user.password);

        if (user && passwordEquals){
            return user;
        } else {
            throw new UnauthorizedException({ message: 'Invalid email or password'});
        }
    }
}