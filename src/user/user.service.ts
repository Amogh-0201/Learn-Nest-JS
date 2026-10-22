import { Injectable, NotFoundException } from '@nestjs/common';
import { LoggerService } from './user.logger';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

export interface User {
    id: number;
    name: string;
    email: string;
}


@Injectable()
export class UserService {

    constructor(private readonly logger: LoggerService) {}

    private users: User[] = [
        {id: 1, name: "John Doe", email: "john@gmail.com"},
        {id: 2, name: "Amogh", email: "amogh@gmail.com"}
    ];

    findAllusers(name: string = '') {
        this.logger.log("Finding all users");
        return this.users.filter((user) =>
            user.name.toLowerCase().includes(name.toLowerCase()),
        )
    }

    findOneUser(id: number) {
        this.logger.log(`finding user with id ${id}`);
        const user = this.users.find((user) => user.id === id);
        if(!user) {
            throw new NotFoundException(`User Not Found with id ${id}`);
        }
        return user;
    }

    createUser(dto: CreateUserDto) {
        this.logger.log("creating user");
        const user: User = {id: this.users.length + 1, name: dto.name, email: dto.email}
        this.users.push(user);
        return user;
    }

    updateUser(id:number, dto: UpdateUserDto) {
        this.logger.log(`Updating user ${id}`);
        
        const idx = this.users.findIndex((user) => user.id === id);
        if (idx === -1) return null;

        this.users[idx] = { ...this.users[idx], ...dto};

        return this.users[idx];
    }

    deleteUser(id: number) {
        this.logger.log(`Deleting user ${id}`);
        
        const idx = this.users.findIndex((user) => user.id === id);
        if(idx === -1) return null;

        const [deleted] = this.users.splice(idx, 1);

        return deleted;
    }
}
