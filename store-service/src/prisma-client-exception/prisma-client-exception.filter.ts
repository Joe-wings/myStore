import { ArgumentsHost, Catch, HttpStatus } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { BaseExceptionFilter } from '@nestjs/core';
import { Response } from 'express';

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaClientExceptionFilter extends BaseExceptionFilter { //扩展BaseExceptionFilter类
  catch(exception:Prisma.PrismaClientKnownRequestError, host: ArgumentsHost) {
    console.error(exception.message);
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const message= exception.message.replace(/\n/g,'')
    //只影响P2002错误
    switch (exception.code) {
      case 'P2002':{
        response.status(HttpStatus.CONFLICT).json({
          statusCode: HttpStatus.CONFLICT,
          message: message,
          error: 'Bad Request',
        });
        break;
      }
      case 'P2025'   :{
        response.status(HttpStatus.NOT_FOUND).json({
          statusCode: HttpStatus.NOT_FOUND,
          message: message,
          error: 'Not Found',
        });
        break;
      }

      //其他错误，默认输出“Internal Server Error”
      default:
        super.catch(exception, host);
        break;  
    } 
  }
}
