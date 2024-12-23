import { ArgumentsHost } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { BaseExceptionFilter } from '@nestjs/core';
export declare class PrismaClientExceptionFilter extends BaseExceptionFilter {
    catch(exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost): void;
}
