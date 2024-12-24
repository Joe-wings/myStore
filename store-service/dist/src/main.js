"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_module_1 = require("./app.module");
const swagger_1 = require("@nestjs/swagger");
const core_1 = require("@nestjs/core");
const common_1 = require("@nestjs/common");
const core_2 = require("@nestjs/core");
const prisma_client_exception_filter_1 = require("./prisma-client-exception/prisma-client-exception.filter");
const cors = require("cors");
async function bootstrap() {
    const app = await core_2.NestFactory.create(app_module_1.AppModule);
    const { httpAdapter } = app.get(core_2.HttpAdapterHost);
    app.useGlobalFilters(new prisma_client_exception_filter_1.PrismaClientExceptionFilter(httpAdapter));
    app.useGlobalPipes(new common_1.ValidationPipe({ whitelist: true }));
    const config = new swagger_1.DocumentBuilder()
        .setTitle('Store Api')
        .setDescription('The store service API description')
        .setVersion('1.0')
        .addTag('store')
        .addBearerAuth()
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('api', app, document);
    app.useGlobalInterceptors(new common_1.ClassSerializerInterceptor(app.get(core_1.Reflector)));
    app.use(cors());
    await app.listen(process.env.PORT ?? 8800);
}
bootstrap();
//# sourceMappingURL=main.js.map