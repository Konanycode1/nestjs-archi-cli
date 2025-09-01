import {
    ExceptionFilter,
    Catch,
    ArgumentsHost,
    HttpException,
  } from '@nestjs/common';
  import { Response } from 'express';
  
  @Catch(HttpException)
  export class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost) {
      const ctx = host.switchToHttp();
      const response = ctx.getResponse<Response>();
      const status = exception.getStatus();
  
      const exceptionResponse = exception.getResponse();
      const message = (exceptionResponse as any)?.message || 'Error server';
  
      const errorResponse = {
        message,
        error: exceptionResponse,
      };
  
      console.error(`[ERROR] ${JSON.stringify(errorResponse)}`);
  
      response.status(status).json(errorResponse);
    }
  }
  