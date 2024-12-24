import { User } from "@prisma/client";
export declare class UserEntity implements User {
    constructor(partial: Partial<UserEntity>);
    id: number;
    username: string;
    email: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
}
