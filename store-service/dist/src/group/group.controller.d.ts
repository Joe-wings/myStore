import { GroupService } from './group.service';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
export declare class GroupController {
    private readonly groupService;
    constructor(groupService: GroupService);
    create(createGroupDto: CreateGroupDto): import(".prisma/client").Prisma.Prisma__GroupClient<{
        id: number;
        name: string;
        fatherId: number | null;
        createdAt: Date;
        updatedAt: Date;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    findAll(): import(".prisma/client").Prisma.PrismaPromise<({
        children: ({
            children: ({
                children: {
                    id: number;
                    name: string;
                    fatherId: number | null;
                    createdAt: Date;
                    updatedAt: Date;
                }[];
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
            })[];
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
        })[];
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
    findOne(id: string): import(".prisma/client").Prisma.Prisma__GroupClient<{
        id: number;
        name: string;
        fatherId: number | null;
        createdAt: Date;
        updatedAt: Date;
    }, null, import("@prisma/client/runtime/library").DefaultArgs>;
    update(id: string, updateGroupDto: UpdateGroupDto): import(".prisma/client").Prisma.Prisma__GroupClient<{
        id: number;
        name: string;
        fatherId: number | null;
        createdAt: Date;
        updatedAt: Date;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    remove(id: string): import(".prisma/client").Prisma.Prisma__GroupClient<{
        id: number;
        name: string;
        fatherId: number | null;
        createdAt: Date;
        updatedAt: Date;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    findProductByGroup(id: number): Promise<{
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
