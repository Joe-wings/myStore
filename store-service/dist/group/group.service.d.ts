import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { PrismaService } from 'src/prisma/prisma.service';
export declare class GroupService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(createGroupDto: CreateGroupDto): import(".prisma/client").Prisma.Prisma__GroupClient<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        fatherId: number | null;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    findAll(): import(".prisma/client").Prisma.PrismaPromise<({
        products: {
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
        }[];
    } & {
        id: number;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        fatherId: number | null;
    })[]>;
    findOne(id: number): import(".prisma/client").Prisma.PrismaPromise<({
        products: {
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
        }[];
    } & {
        id: number;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        fatherId: number | null;
    })[]>;
    search(name: string): import(".prisma/client").Prisma.PrismaPromise<({
        products: {
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
        }[];
    } & {
        id: number;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        fatherId: number | null;
    })[]>;
    update(id: number, updateGroupDto: UpdateGroupDto): import(".prisma/client").Prisma.Prisma__GroupClient<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        fatherId: number | null;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    remove(id: number): import(".prisma/client").Prisma.Prisma__GroupClient<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        fatherId: number | null;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
}
