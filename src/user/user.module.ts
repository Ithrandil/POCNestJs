import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PassportModule } from '@nestjs/passport';

@Module({
    imports: [PassportModule.register({ defaultStrategy: 'jwt' })],
    controllers: [UserController],
    providers: [UserService],
    exports: [UserService],
})
export class UserModule {}
