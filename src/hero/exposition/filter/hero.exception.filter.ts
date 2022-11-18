import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { HeroNotFoundException } from '../../application/exceptions/hero.not.found.exception';
import { Request, Response } from 'express';
import { HeroInvalidArgumentException } from '../../application/exceptions/hero.invalid.argument.exception';

@Catch()
export class HeroExceptionFilter implements ExceptionFilter {
  catch(exception: Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const body = {
      statusCode:
        exception instanceof HttpException
          ? exception.getStatus()
          : HttpStatus.INTERNAL_SERVER_ERROR,
      timestamp: new Date().toISOString(),
      message: exception.message,
      path: request.url,
    };

    switch (exception.name) {
      case HeroNotFoundException.name:
        body.statusCode = 404;
        break;
      case HeroInvalidArgumentException.name:
        body.statusCode = 402;
        break;
      default:
        if (exception instanceof HttpException) {
          console.log(
            `Unhandled exception on '${request.url}' : '${exception.stack}' `,
          );
        }
    }

    response.status(body.statusCode).json(body);
  }
}
