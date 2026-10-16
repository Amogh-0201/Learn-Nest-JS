import { Body, Controller, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
export class UserController {

    // @Get('all')    // GET /user/all
    // @Get(':id')    // GET  /user/:id  - dynamic segment
    // @Post()        // POST /user
    // @Patch(':id')   // PATCH /user/:id   
    // or we can use same for put and delete

    // ****** ALWAYS PUT THE STATIC ROUTES ABOVE THE DYNAMIC ROUTE ******
    // get /user
    @Get()
    getUser(@Query('name') name: string) {
        const users = [
            {id: 1, name: "John Doe"},
            {id: 2, name: "Amogh"}
        ];

        if(name) {
            return users.filter((user) =>
                user.name.toLowerCase().includes(name.toLowerCase()),
            );
        }

        return users;
    }

    @Get(':id')
    getUserById(@Param('id') id: number) {
        return {id, name: 'John Doe'};
    }

    @Post()
    createUser(@Body() createUserDto: CreateUserDto) {
        return {
            data: createUserDto,
            message: `user with name ${createUserDto.name} created successfully`
        };
    }

    @Patch(':id')
    updateUser(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
        return {
            data: { id, ...updateUserDto},
            message: "user updated successfully"
        };
    }
}
