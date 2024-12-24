import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
export declare class ProductController {
    private readonly productService;
    constructor(productService: ProductService);
    create(createProductDto: CreateProductDto): import(".prisma/client").Prisma.Prisma__ProductClient<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        description: string | null;
        price: number;
        count: number;
        groupId: number;
        creatorId: number;
        image: string | null;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    findAll(): import(".prisma/client").Prisma.PrismaPromise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        description: string | null;
        price: number;
        count: number;
        groupId: number;
        creatorId: number;
        image: string | null;
    }[]>;
    findOne(id: string): import(".prisma/client").Prisma.PrismaPromise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        description: string | null;
        price: number;
        count: number;
        groupId: number;
        creatorId: number;
        image: string | null;
    }[]>;
    update(id: string, updateProductDto: UpdateProductDto): import(".prisma/client").Prisma.Prisma__ProductClient<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        description: string | null;
        price: number;
        count: number;
        groupId: number;
        creatorId: number;
        image: string | null;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    search(query: string): import(".prisma/client").Prisma.PrismaPromise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        description: string | null;
        price: number;
        count: number;
        groupId: number;
        creatorId: number;
        image: string | null;
    }[]>;
    remove(id: string): import(".prisma/client").Prisma.Prisma__ProductClient<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        description: string | null;
        price: number;
        count: number;
        groupId: number;
        creatorId: number;
        image: string | null;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
}
