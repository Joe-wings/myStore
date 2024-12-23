import { ApiProperty } from "@nestjs/swagger";
import { User } from "@prisma/client";
import { Exclude } from "class-transformer";

//屏蔽了password字段，用于返回到响应报文
export class UserEntity implements User {
    constructor(partial: Partial<UserEntity>) {
        Object.assign(this, partial);
    }
    @ApiProperty()
    id: number;

    @ApiProperty()
    username: string;

    @ApiProperty()
    email: string;

    @Exclude()
    password: string;

    @ApiProperty()
    createdAt: Date;

    @ApiProperty()
    updatedAt: Date;
}
