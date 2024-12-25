import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from '../prisma/prisma.service';
export declare class ProductService {
    private prisma;
    constructor(prisma: PrismaService);
    create(createProductDto: CreateProductDto): import(".prisma/client").Prisma.Prisma__ProductClient<{
        id: number;
        name: string;
        price: number;
        description: string | null;
        image: string | null;
        count: number;
        creatorId: number;
        groupId: number;
        createdAt: Date;
        updatedAt: Date;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    findAll(): import(".prisma/client").Prisma.PrismaPromise<{
        id: number;
        name: string;
        price: number;
        description: string | null;
        image: string | null;
        count: number;
        creatorId: number;
        groupId: number;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
    findOne(id: number): import(".prisma/client").Prisma.Prisma__ProductClient<{
        id: number;
        name: string;
        price: number;
        description: string | null;
        image: string | null;
        count: number;
        creatorId: number;
        groupId: number;
        createdAt: Date;
        updatedAt: Date;
    }, null, import("@prisma/client/runtime/library").DefaultArgs>;
    findByCreatorId(id: number): import(".prisma/client").Prisma.PrismaPromise<{
        id: number;
        name: string;
        price: number;
        description: string | null;
        image: string | null;
        count: number;
        creatorId: number;
        groupId: number;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
    search(query: string): import(".prisma/client").Prisma.PrismaPromise<{
        id: number;
        name: string;
        price: number;
        description: string | null;
        image: string | null;
        count: number;
        creatorId: number;
        groupId: number;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
    update(id: number, updateProductDto: UpdateProductDto): import(".prisma/client").Prisma.Prisma__ProductClient<{
        id: number;
        name: string;
        price: number;
        description: string | null;
        image: string | null;
        count: number;
        creatorId: number;
        groupId: number;
        createdAt: Date;
        updatedAt: Date;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    remove(id: number): import(".prisma/client").Prisma.Prisma__ProductClient<{
        id: number;
        name: string;
        price: number;
        description: string | null;
        image: string | null;
        count: number;
        creatorId: number;
        groupId: number;
        createdAt: Date;
        updatedAt: Date;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
}
