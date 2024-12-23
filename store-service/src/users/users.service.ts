import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';

export const roundsOfHashing = 10;
@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}
  create(createUserDto: CreateUserDto) {
    const hashedPassword = bcrypt.hashSync(
      createUserDto.password,
      roundsOfHashing,
    ); //对输入的密码进行哈希处理
    createUserDto.password = hashedPassword;
    return this.prisma.user.create({
      data: createUserDto,
    });
  }

  findAll() {
    return this.prisma.user.findMany();
  }

  findOne(id: number) {
    return this.prisma.user.findMany({
      where: { id },
    });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    if (updateUserDto.password) {
      const hashedPassword = bcrypt.hashSync(
        updateUserDto.password,
        roundsOfHashing,
      ); //对输入的密码进行哈希处理
      updateUserDto.password = hashedPassword;
    }
    return this.prisma.user.update({
      where: { id },
      data: updateUserDto,
    });
  }

  remove(id: number) {
    return this.prisma.user.delete({
      where: { id },
    });
  }
}
