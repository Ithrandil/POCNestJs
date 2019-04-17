import { IsString, IsInt, IsBoolean, IsEmail} from 'class-validator';

export class User {
    @IsString()
    readonly firstName: string;

    @IsString()
    readonly lastName: string;

    @IsEmail()
    readonly email: string;

    @IsInt()
    readonly age: number;

    @IsBoolean()
    readonly isAdmin: boolean;

    @IsString()
    readonly password: string;

    @IsString()
    readonly phone: string;
}
