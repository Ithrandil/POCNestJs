import { Controller, Inject, Get, Post, Body, Param, Delete, Put, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './model/user.model';
import { Observable } from 'rxjs';
import { UserDto } from './dto/user.dto';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from 'src/roles/roles.decorator';

@Controller('user')
export class UserController {

    constructor(private readonly userService: UserService) {}

    @Roles('admin')
    @Get('test')
    test() {
        return this.userService.test();
    }

    @Get('myprettylittlelogger')
    getMyLogger() {
        return this.userService.getMyLogger();
    }

    @UseGuards(AuthGuard())
    @Get('all')
    getAllUsers(): Observable<UserDto[]> {
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

}
