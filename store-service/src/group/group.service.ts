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
        children: true
      },
    });
  }

  findOne(id: number) {
    return this.prisma.group.findUnique({
      where: { id: id },
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
      where: { id: id },
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
  //根据分类返回商品列表,父级分类返回子分类下的所有商品列表
  async findProductsByGroupId(id: number) {
    const categoryIds = await this.findBottom(id, []);
    //根据最底层分类的id数组，查找所有商品
    const products = await this.prisma.product.findMany({
      where: {
        groupId: {
          in: categoryIds,
        },
      },
    });
    return products;
  }


  findBottom = async (id: number, categoryId: number[]) => {
    const group = await this.prisma.group.findFirst({
      where: { fatherId: id },
    });
    //没有子分类，说明已经是最底层的分类了
    if (!group) {
      categoryId.push(id); //将最底层的分类id加入数组
    } else {
      //有子分类，递归查找
      //找出该分类下的所有子分类
      const childs = await this.prisma.group.findMany({
        where: { fatherId: id },
      });
      //递归查找子分类
      for (const child of childs) {
        await this.findBottom(child.id, categoryId);
      }
    }
    return categoryId;
  };
}
