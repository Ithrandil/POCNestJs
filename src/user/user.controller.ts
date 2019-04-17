import { Controller, Get, Post, Body, Param, Delete, Put, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './model/user.model';
import { Observable } from 'rxjs';
import { UserDto } from './dto/user.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('user')
export class UserController {

    constructor(private readonly userService: UserService) {}

    @Get('myprettylittlelogger')
    getMyLogger() {
        return this.userService.getMyLogger();
    }
    @UseGuards(AuthGuard())
    @Get('all')
    findAll(): Observable<UserDto[]> {
        return this.userService.getAllUsers();
    }
    @UseGuards(AuthGuard())
    @Get(':id')
    getById(@Param() params): Observable<UserDto> {
        return this.userService.getUserById(params.id);
    }

    @UseGuards(AuthGuard())
    @Put('update/:id')
    updateUser(@Body() updatedUser: User, @Param() params): string {
        return this.userService.updateUser(updatedUser, params.id);
    }

    @Post('create')
    createUser(@Body() newUser: User): string {
        return this.userService.createUser(newUser);
    }

    @UseGuards(AuthGuard())
    @Delete(':id')
    deleteUser(@Param() params): string {
        return this.userService.deleteUser(params.id);
    }

    @UseGuards(AuthGuard())
    @Get('mail/:email')
    findOneByEmail(@Param() params): User {
        return this.userService.findOneByEmail(params.email);
    }

}
