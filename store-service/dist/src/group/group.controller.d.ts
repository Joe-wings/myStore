import { GroupService } from './group.service';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
export declare class GroupController {
    private readonly groupService;
    constructor(groupService: GroupService);
    create(createGroupDto: CreateGroupDto): import(".prisma/client").Prisma.Prisma__GroupClient<{
        fatherId: number | null;
        id: number;
        createdAt: Date;
        updatedAt: Date;
        name: string;
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
        children: ({
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
            children: ({
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
                children: {
                    fatherId: number | null;
                    id: number;
                    createdAt: Date;
                    updatedAt: Date;
                    name: string;
                }[];
            } & {
                fatherId: number | null;
                id: number;
                createdAt: Date;
                updatedAt: Date;
                name: string;
            })[];
        } & {
            fatherId: number | null;
            id: number;
            createdAt: Date;
            updatedAt: Date;
            name: string;
        })[];
    } & {
        fatherId: number | null;
        id: number;
        createdAt: Date;
        updatedAt: Date;
        name: string;
    })[]>;
    findOne(id: string): import(".prisma/client").Prisma.Prisma__GroupClient<{
        fatherId: number | null;
        id: number;
        createdAt: Date;
        updatedAt: Date;
        name: string;
    }, null, import("@prisma/client/runtime/library").DefaultArgs>;
    update(id: string, updateGroupDto: UpdateGroupDto): import(".prisma/client").Prisma.Prisma__GroupClient<{
        fatherId: number | null;
        id: number;
        createdAt: Date;
        updatedAt: Date;
        name: string;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    remove(id: string): import(".prisma/client").Prisma.Prisma__GroupClient<{
        fatherId: number | null;
        id: number;
        createdAt: Date;
        updatedAt: Date;
        name: string;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    findProductByGroup(id: number): Promise<{
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
}
