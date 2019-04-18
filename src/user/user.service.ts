import { Injectable, HttpException, HttpStatus, Logger, Inject  } from '@nestjs/common';
import { User } from './model/user.model';
import { of, Observable } from 'rxjs';
import { UserDto } from './dto/user.dto';
import { Logger as LoggerWinston } from 'winston';
import { MyLogger } from '../logger/mylogger';

@Injectable()
export class UserService {

    constructor(@Inject('winston') private readonly loggerWinston: LoggerWinston,
                ) {}

    private readonly loggerNest = new Logger(UserService.name);
    private readonly mylogger = new MyLogger(UserService.name);

    mockedUserDB: User[] = [
        {
            firstName: 'Alex',
            lastName: 'GUERIN',
            email: 'alex@apside.com',
            age: 30,
            isAdmin: true,
            password: 'adminpassword',
            phone: '0784657125',
        },
        {
            firstName: 'JN',
            lastName: 'Bourrat',
            email: 'jn@apside.com',
            age: 28,
            isAdmin: false,
            password: 'trolilol',
            phone: '0836656565',
        },
        {
            firstName: 'Florent',
            lastName: 'PERTICOZ',
            email: 'florent@apside.com',
            age: 38,
            isAdmin: false,
            password: 'fuckBNP',
            phone: '0123456789',
        },
    ];

    getAllUsers(): Observable<UserDto[]> {
        const userDtoArray: UserDto[] = [];
        for (const user of this.mockedUserDB) {
            const userDto = {
                firstName: user.firstName,
                lastName: user.lastName,
                age: user.age,
                id: this.mockedUserDB.indexOf(user) + 1,
            };
            userDtoArray.push(userDto);
        }
        return of (userDtoArray);
    }

    getUserById(userId: number): Observable<UserDto> {
        if (userId > this.mockedUserDB.length) {
            throw new HttpException({
                status: HttpStatus.I_AM_A_TEAPOT,
                error: 'Incorrect user',
            }, 418);
        }

        const returnedUser: UserDto = {
                                     firstName: this.mockedUserDB[userId - 1].firstName,
                                     lastName: this.mockedUserDB[userId - 1].lastName,
                                     age: this.mockedUserDB[userId - 1].age,
                                     id: userId,
                                    };
        return of (returnedUser);
    }

    updateUser(updatedUser: User, userId: number): string {
        if (userId > this.mockedUserDB.length) {
            throw new HttpException({
                status: HttpStatus.I_AM_A_TEAPOT,
                error: 'Incorrect user',
            }, 418);
        }
        this.mockedUserDB[userId - 1] = updatedUser;
        return `User number ${userId} have been updated`;
    }

    createUser(newUser: User): string {
        this.mockedUserDB.push(newUser);
        return `User number ${this.mockedUserDB.length} have been created`;
    }

    deleteUser(userId: number): string {
        if (userId > this.mockedUserDB.length) {
            throw new HttpException({
                status: HttpStatus.I_AM_A_TEAPOT,
                error: 'Incorrect user',
            }, 418);
        }
        this.mockedUserDB.splice(userId - 1, 1);
        return `User number ${userId} have been deleted`;
    }

    findOneByEmail(email: string): User {
        return this.mockedUserDB.find((user) => email === user.email);
    }

    getMyLogger() {
        this.loggerNest.log('Ceci n\'est pas un console.log');
        this.loggerNest.error('Ceci n\'est pas un console.err');
        this.loggerNest.warn('Ceci n\'est pas un console.warn');
        this.loggerNest.verbose('Ceci n\'est pas un console.log verbose');

        this.loggerWinston.info('This is a winston info log ' + UserService.name);
        this.loggerWinston.error('This is a winston error log');
        this.loggerWinston.warn('This is a winston warning log');

        this.mylogger.log('Test LOG');
        this.mylogger.error('Test ERROR');
    }

    test(): string {
        return 'Test';
    }

}
