import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiBearerAuth, ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { UserEntity } from './entities/user.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiCreatedResponse({ type: UserEntity })  //请求状态码为201时，指定响应返回的类型
  async register(@Body() createUserDto: CreateUserDto) {
    return new UserEntity(await this.usersService.create(createUserDto));
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({ type: UserEntity})  //请求状态码为200时，指定响应返回的类型
  async findAll() {
    const users = (await this.usersService.findAll()).map(user => new UserEntity(user));
    return users.map(user =>new UserEntity(user));
  }

  @Get('/getbyid/:id')
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({ type: UserEntity})  //请求状态码为200时，指定响应返回的类型
  async findOne(@Param('id') id: string) {
    return new UserEntity(await this.usersService.findOne(+id))
  }

  @Patch('/change/:id')

  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return new UserEntity( await this.usersService.update(+id, updateUserDto));
     
  }

  @Delete('delete/:id')
  @UseGuards(JwtAuthGuard)
  async remove(@Param('id') id: string) {
    return new UserEntity(await this.usersService.remove(+id));
  }
}
