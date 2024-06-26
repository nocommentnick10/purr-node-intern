import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from './users.model';
import { InjectModel } from '@nestjs/sequelize';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {

    constructor(@InjectModel(User) private userRepository: typeof User){

    }

    async createUser(dto: CreateUserDto){
        const user = await this.userRepository.create(dto);
        return user;
    }

    async getAllUsers(){
        const users = await this.userRepository.findAll();
        return users;
    }

    async getUsersByEmail(email: string){
        const user = await this.userRepository.findOne({ where: {email}, include: {all: true}});
        return user;
    }

    async getUserById(id: number): Promise<User>{
        const user = await this.userRepository.findOne({ where: {id}, include: {all: true}});

        if (!user){
            throw new NotFoundException({ message: 'User with this id does not exist' });
        }
        
        return user;
    }
}
