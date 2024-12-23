import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthEntity } from './entities/auth.entity';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  @ApiOkResponse({ type: AuthEntity })
  Login(@Body() createAuthDto: LoginDto) {
    return this.authService.Login(createAuthDto);
  }
}
