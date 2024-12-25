import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { jwtSecret } from './auth.module';
import { PrismaService } from 'src/prisma/prisma.service';
@Injectable()
//参数为策略实现和策略名称，此处为passport-jwt中预定义的策略
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private prisma: PrismaService) {
    super({
      //用于从请求头中提取JWT的方法
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      // 验证JWT所使用的密钥
      secretOrKey: jwtSecret,
    });
  }
//根据JWT签名找回用户

async validate(payload: {userId: number}) {
  const user = await this.prisma.user.findMany({
    where: { id: payload.userId },
  });
  if (!user) {
    throw new UnauthorizedException();
  }
  return user;
}
}