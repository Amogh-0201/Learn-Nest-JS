import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserService } from './user.service';

@Controller('user')
export class UserController {

    constructor(private readonly userService: UserService) {}

    // @Get('all')    // GET /user/all
    // @Get(':id')    // GET  /user/:id  - dynamic segment
    // @Post()        // POST /user
    // @Patch(':id')   // PATCH /user/:id   
    // or we can use same for put and delete

    // ****** ALWAYS PUT THE STATIC ROUTES ABOVE THE DYNAMIC ROUTE ******
    // get /user
    @Get()
    getUser(@Query('name') name: string): User[] {
        return this.userService.findAllusers(name);
    }

    @Get(':id')
    getUserById(@Param('id', ParseIntPipe) id: number): User | {} {
        return this.userService.findOneUser(id);
    }

    @Post()
    createUser(@Body() createUserDto: CreateUserDto): User | {} {
        return this.userService.createUser(createUserDto);
    }

    @Patch(':id')
    updateUser(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
        return this.userService.updateUser(Number(id), updateUserDto);
    }

    @Delete(':id')
    deleteUser(@Param('id') id: string) {
        return this.userService.deleteUser(Number(id));
    }
}
