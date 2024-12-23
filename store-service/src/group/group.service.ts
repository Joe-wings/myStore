import { Injectable } from '@nestjs/common';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { PrismaService } from 'src/prisma/prisma.service';
@Injectable()
export class GroupService {
  constructor(private readonly prisma: PrismaService) {}
  create(createGroupDto: CreateGroupDto) {
    return this.prisma.group.create({
      data: createGroupDto,
    });
  }

  findAll() {
    return this.prisma.group.findMany({
      include: {
        products: true,
      },
    });
  }

  findOne(id: number) {
    return this.prisma.group.findMany({
      where: { id: id },
      include: {
        products: true,
      },
    });
  }
  //根据类名检索
 search(name: string) {
    return this.prisma.group.findMany({
      where: { name: { contains: name } },
      include: {
        products: true,
      },
    });
  }
  update(id: number, updateGroupDto: UpdateGroupDto) {
    return this.prisma.group.update({
      where: { id: id },
      data: updateGroupDto,
    });
  }

  remove(id: number) {
    return this.prisma.group.delete({ 
      where: { id: id } 
    });
  }
}
