import { GroupService } from './group.service';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
export declare class GroupController {
    private readonly groupService;
    constructor(groupService: GroupService);
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
    findOne(id: string): import(".prisma/client").Prisma.PrismaPromise<({
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
    update(id: string, updateGroupDto: UpdateGroupDto): import(".prisma/client").Prisma.Prisma__GroupClient<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        fatherId: number | null;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    remove(id: string): import(".prisma/client").Prisma.Prisma__GroupClient<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        fatherId: number | null;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
}
