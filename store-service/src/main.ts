import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { Reflector } from '@nestjs/core';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { HttpAdapterHost,NestFactory } from '@nestjs/core';
import { PrismaClientExceptionFilter } from './prisma-client-exception/prisma-client-exception.filter';
import * as cors from 'cors';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  //设置全局异常过滤器
  const {httpAdapter} =app.get(HttpAdapterHost)
  app.useGlobalFilters(new PrismaClientExceptionFilter(httpAdapter))

  app.useGlobalPipes(new ValidationPipe({ whitelist: true }))
  //设置Wagger文档
  const config = new DocumentBuilder()
    .setTitle('Store Api')
    .setDescription('The store service API description')
    .setVersion('1.0')
    .addTag('store')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  //添加拦截器，阻止返回password字段
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  //设置跨域
  app.use(cors());
  
  await app.listen(process.env.PORT ?? 8800);
}
bootstrap();
