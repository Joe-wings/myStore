import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { PrismaService } from 'src/prisma/prisma.service';
export declare class GroupService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(createGroupDto: CreateGroupDto): import(".prisma/client").Prisma.Prisma__GroupClient<{
        id: number;
        name: string;
        fatherId: number | null;
        createdAt: Date;
        updatedAt: Date;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    findAll(): import(".prisma/client").Prisma.PrismaPromise<({
        products: {
            id: number;
            name: string;
            createdAt: Date;
            updatedAt: Date;
            price: number;
            description: string | null;
            image: string | null;
            count: number;
            creatorId: number;
            groupId: number;
        }[];
    } & {
        id: number;
        name: string;
        fatherId: number | null;
        createdAt: Date;
        updatedAt: Date;
    })[]>;
    update(id: number, updateGroupDto: UpdateGroupDto): import(".prisma/client").Prisma.Prisma__GroupClient<{
        id: number;
        name: string;
        fatherId: number | null;
        createdAt: Date;
        updatedAt: Date;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    remove(id: number): import(".prisma/client").Prisma.Prisma__GroupClient<{
        id: number;
        name: string;
        fatherId: number | null;
        createdAt: Date;
        updatedAt: Date;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    search(name: string): import(".prisma/client").Prisma.PrismaPromise<({
        products: {
            id: number;
            name: string;
            createdAt: Date;
            updatedAt: Date;
            price: number;
            description: string | null;
            image: string | null;
            count: number;
            creatorId: number;
            groupId: number;
        }[];
    } & {
        id: number;
        name: string;
        fatherId: number | null;
        createdAt: Date;
        updatedAt: Date;
    })[]>;
    findProductsByGroupId(id: number): Promise<{
        id: number;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        price: number;
        description: string | null;
        image: string | null;
        count: number;
        creatorId: number;
        groupId: number;
    }[]>;
}
