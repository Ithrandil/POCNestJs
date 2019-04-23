import { Module, ValidationPipe } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { APP_PIPE, APP_GUARD, APP_FILTER } from '@nestjs/core';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { WinstonModule } from 'nest-winston';
import { RolesGuard } from './roles/roles.guard';
import { HttpExceptionFilter } from './filters/http-exception.filter';
import { ConfigModule } from './config/config.module';
import * as winston from 'winston';

@Module({
  imports: [AuthModule,
            UserModule,
            WinstonModule.forRoot({
              format: winston.format.combine(
                winston.format.colorize({ colors: { info: 'blue' }}),
                winston.format.timestamp({format: 'YYYY-MM-DD HH:mm:ss'}),
                winston.format.simple(),
              ),
              // level: 'info',
                // winston.format.errors({ stack: true }),
                // winston.format.splat(),
                // winston.format.json(),
              // ),
              // defaultMeta: { service: __filename },
              transports: [
                new winston.transports.Console(),
                new winston.transports.File({ dirname: 'logs', filename: 'quick-start-error.log', level: 'error' }),
                new winston.transports.File({ dirname: 'logs', filename: 'quick-start-combined.log', format: winston.format.uncolorize() }),
            ],
            }),
            ConfigModule,
          ],
  controllers: [AppController],
  providers: [AppService,
              {
                provide: APP_PIPE,
                useClass: ValidationPipe,
              },
              {
                provide: APP_GUARD,
                useClass: RolesGuard,
              },
              {
                provide: APP_FILTER,
                useClass: HttpExceptionFilter,
              },
            ],
})
export class AppModule {}
