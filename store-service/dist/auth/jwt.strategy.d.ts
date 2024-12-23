import { Strategy } from 'passport-jwt';
import { PrismaService } from 'src/prisma/prisma.service';
declare const JwtStrategy_base: new (...args: any[]) => Strategy;
export declare class JwtStrategy extends JwtStrategy_base {
    private prisma;
    constructor(prisma: PrismaService);
    validate(payload: {
        userId: number;
    }): Promise<{
        id: number;
        email: string;
        password: string;
        username: string | null;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
}
export {};
