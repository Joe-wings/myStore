import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiBearerAuth, ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiResponse, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { UserEntity } from './entities/user.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiOperation({ summary: '注册用户' })
  @ApiResponse({ status: 409, description: '该邮箱已注册过账号' })
  @ApiResponse({ status: 400, description: '数据格式有误' })
  @ApiCreatedResponse({ type: UserEntity })  //请求状态码为201时，指定响应返回的类型
  async register(@Body() createUserDto: CreateUserDto) {
    return new UserEntity(await this.usersService.create(createUserDto));
  }

  @Get('/getbyid/:id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiUnauthorizedResponse({ description: '未授权' })  //请求状态码为401时，指定响应返回的类型
  @ApiOkResponse({ type: UserEntity})  //请求状态码为200时，指定响应返回的类型
  async findOne(@Param('id') id: string) {
    return new UserEntity(await this.usersService.findOne(+id))
  }

  @Patch('/change/:id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return new UserEntity( await this.usersService.update(+id, updateUserDto));
     
  }

  @Delete('delete/:id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async remove(@Param('id') id: string) {
    return new UserEntity(await this.usersService.remove(+id));
  }
}
