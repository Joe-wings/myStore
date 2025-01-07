import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthEntity } from './entities/auth.entity';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { LoginDto } from './dto/login.dto';
@Injectable()
export class AuthService {
  constructor(private readonly prisma: PrismaService,private readonly jwtService: JwtService) {}
  async Login(createAuthDto: LoginDto):Promise<AuthEntity> {
    const user = await this.prisma.user.findUnique({
      where: {
        email: createAuthDto.email,
      },
    });
    const isPassWordValid = await bcrypt.compare(createAuthDto.password, user.password);
    if (!user) {
      throw new NotFoundException('用户不存在');
    }
    if (isPassWordValid) {
      
        const token = this.jwtService.sign({id: user.id});
        return {
          access_token: token,
      };
    }else {
      throw new UnauthorizedException('密码错误');
    }
  }
}
