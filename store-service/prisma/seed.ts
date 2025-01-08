import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcryptjs';
import { roundsOfHashing } from 'src/users/users.service';
// initialize Prisma Client
const prisma = new PrismaClient();

async function main() {
  // create some sample data
  const users = await prisma.user.createMany({
    data: [
      {
        username: 'John',
        email: 'John@123.com',
        password:bcrypt.hashSync('778899',roundsOfHashing),
      },
      {
        username: 'Sarah',
        email: 'Sarah@123.com',
        password: bcrypt.hashSync('778899',roundsOfHashing),
      },
    ],
  });

  const products = await prisma.product.createMany({
    data: [
      {
        name: '阿克苏苹果',
        price: 9.99,
        description: 'A tasty fruit',
        image: 'https://via.placeholder.com/150',
        count: 10,
        creatorId: users[0].id,
        groupId: 6,
      },
      {
        name: '西瓜',
        price: 8.99,
        description: 'A tasty fruit',
        image: 'https://via.placeholder.com/150',
        count: 10,
        creatorId: users[0].id,
        groupId: 6,
      },
      {
        name: '香蕉',
        price: 10.99,
        description: 'A tasty fruit',
        image: 'https://via.placeholder.com/150',
        count: 10,
        creatorId: users[0].id,
        groupId: 6,
      },
      {
        name: '蓝莓',
        price: 7.99,
        description: 'A tasty fruit',
        image: 'https://via.placeholder.com/150',
        count: 10,
        creatorId: users[0].id,
        groupId: 6,
      },
      {
        name: '草莓',
        price: 6.99,
        description: 'A tasty fruit',
        image: 'https://via.placeholder.com/150',
        count: 10,
        creatorId: users[0].id,
        groupId: 6,
      },
      {
        name: '佳洁士牙膏',
        price: 12.99,
        description: 'A tasty skin care product',
        image: 'https://via.placeholder.com/150',
        count: 10,
        creatorId: users[1].id,
        groupId: 5,
      },
      {
        name: '熊博士牙膏',
        price: 15.99,
        description: 'A tasty skin care product',
        image: 'https://via.placeholder.com/150',
        count: 15,
        creatorId: users[1].id,
        groupId: 5,
      },
      {
        name: '清风抽纸',
        price: 11.99,
        description: 'A tasty paper',
        image: 'https://via.placeholder.com/150',
        count: 10,
        creatorId: users[2].id,
        groupId: 4,
      },
    ],
  });
  const groups = await prisma.group.createMany({
    data: [
      {
        name: '食品',
        
      },
      {
        name: '化妆品',
        
      },
      {
        name: '纸品',
        fatherId: 1,
        
      },
      {
        name: '洗漱用品',
        fatherId: 1,
        
      },
      {
        name: '水果',
        fatherId: 2,
      },
    ],
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    // close Prisma Client at the end
    await prisma.$disconnect();
  });
