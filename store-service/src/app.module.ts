import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { ProductModule } from './product/product.module';
import { GroupModule } from './group/group.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [PrismaModule, UsersModule, ProductModule, GroupModule, AuthModule],
})
export class AppModule {}
