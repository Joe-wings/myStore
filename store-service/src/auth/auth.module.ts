import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';

export const jwtSecret = 'elpsycongroo';
@Module({
  controllers: [AuthController],
  providers: [AuthService,JwtStrategy],
  imports: [
    JwtModule.register({
      secret: jwtSecret,
      signOptions: { expiresIn: '1h' },//定义token的过期时间
    }),
    PrismaModule,
    PassportModule,
  ],
})
export class AuthModule {}
