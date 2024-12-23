import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
export declare class ProductController {
    private readonly productService;
    constructor(productService: ProductService);
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
    findOne(id: string): import(".prisma/client").Prisma.PrismaPromise<{
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
    update(id: string, updateProductDto: UpdateProductDto): import(".prisma/client").Prisma.Prisma__ProductClient<{
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
    remove(id: string): import(".prisma/client").Prisma.Prisma__ProductClient<{
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
