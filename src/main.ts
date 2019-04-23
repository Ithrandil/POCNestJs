import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './filters/http-exception.filter';
import { ConfigService } from './config/config.service';
import { MyLogger } from './logger/mylogger';

const logger = new MyLogger('SERVER');

const config = new ConfigService(`config/${process.env.NODE_ENV}.env`);
const PORT = config.get('PORT') || 3000;

async function bootstrap() {

  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new HttpExceptionFilter());
  logger.log(`App starting on ${config.get('NODE_ENV')} mode`);
  await app.listen(PORT);
  logger.log(`Server is listening on port ${PORT}`);
}
bootstrap();
