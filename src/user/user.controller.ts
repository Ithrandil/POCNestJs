import { Controller, Inject, Get, Post, Body, Param, Delete, Put, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './model/user.model';
import { Observable } from 'rxjs';
import { UserDto } from './dto/user.dto';
import { AuthGuard } from '@nestjs/passport';
import { MyLogger } from 'src/logger/mylogger';

@Controller('user')
export class UserController {

    constructor(private readonly userService: UserService) {}

    private readonly mylogger = new MyLogger(UserController.name);

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
        try {
            return this.userService.getAllUsers();
        } catch (error) {
            this.mylogger.error(error);
        }
    }

    @UseGuards(AuthGuard())
    @Get(':id')
    getById(@Param() params): Observable<UserDto> {
        try {
            return this.userService.getUserById(params.id);
        } catch (error) {
            this.mylogger.error(error);
            return error.message;
        }
    }

    @UseGuards(AuthGuard())
    @Put('update/:id')
    updateUser(@Body() updatedUser: User, @Param() params): string {
        try {
            return this.userService.updateUser(updatedUser, params.id);
        } catch (error) {
            this.mylogger.error(error);
        }
    }

    @Post('create')
    createUser(@Body() newUser: User): string {
        try {
            return this.userService.createUser(newUser);
        } catch (error) {
            this.mylogger.error(error);
        }
    }

    @UseGuards(AuthGuard())
    @Delete(':id')
    deleteUser(@Param() params): string {
        try {
            return this.userService.deleteUser(params.id);
        } catch (error) {
            this.mylogger.error(error);
        }
    }

    @UseGuards(AuthGuard())
    @Get('mail/:email')
    findOneByEmail(@Param() params): User {
        try {
            return this.userService.findOneByEmail(params.email);
        } catch (error) {
            this.mylogger.error(error);
        }
    }

}
