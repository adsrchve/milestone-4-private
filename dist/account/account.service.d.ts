import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
export declare class AccountService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(userId: string, dto: CreateAccountDto): Prisma.Prisma__AccountClient<{
        id: string;
        createdAt: Date;
        accountNumber: string;
        balance: Prisma.Decimal;
        updatedAt: Date;
        userId: string;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    findAll(userId: string): Promise<{
        id: string;
        createdAt: Date;
        accountNumber: string;
        balance: Prisma.Decimal;
        updatedAt: Date;
        userId: string;
    }[]>;
    findOne(userId: string, id: string): Promise<{
        id: string;
        createdAt: Date;
        accountNumber: string;
        balance: Prisma.Decimal;
        updatedAt: Date;
        userId: string;
    }>;
    update(userId: string, id: string, dto: UpdateAccountDto): Promise<{
        id: string;
        createdAt: Date;
        accountNumber: string;
        balance: Prisma.Decimal;
        updatedAt: Date;
        userId: string;
    }>;
    remove(userId: string, id: string): Promise<{
        id: string;
        createdAt: Date;
        accountNumber: string;
        balance: Prisma.Decimal;
        updatedAt: Date;
        userId: string;
    }>;
}
