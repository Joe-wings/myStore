import { Strategy } from 'passport-jwt';
import { PrismaService } from 'src/prisma/prisma.service';
declare const JwtStrategy_base: new (...args: any[]) => Strategy;
export declare class JwtStrategy extends JwtStrategy_base {
    private prisma;
    constructor(prisma: PrismaService);
    validate(payload: {
        userId: number;
    }): Promise<{
        username: string | null;
        email: string;
        password: string;
        id: number;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
}
export {};
