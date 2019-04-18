import { Module, ValidationPipe } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { APP_PIPE, APP_GUARD } from '@nestjs/core';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { WinstonModule } from 'nest-winston';
import * as winston from 'winston';
import { RolesGuard } from './roles/roles.guard';

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
                new winston.transports.File({ filename: 'quick-start-error.log', level: 'error' }),
                new winston.transports.File({ dirname: 'logs', filename: 'quick-start-combined.log', format: winston.format.uncolorize() }),
            ],
            }),
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
              }
              ],
})
export class AppModule {}
