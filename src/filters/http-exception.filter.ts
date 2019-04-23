import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from '@nestjs/common';
import { Request, Response } from 'express';
import { MyLogger } from 'src/logger/mylogger';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {

  private readonly mylogger = new MyLogger(HttpExceptionFilter.name);

  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const res = ctx.getResponse<Response>();
    const req = ctx.getRequest<Request>();
    const status = exception.getStatus();

    res
      .status(status)
      .json({
        statusCode: status,
        error: exception.message.error,
        timestamp: new Date().toISOString(),
        path: req.url,
      });

    const loggedError = {
                          exception: exception.message,
                          path: req.url,
                          location: exception.stack,
                        };
    this.mylogger.error(loggedError);
  }
}
