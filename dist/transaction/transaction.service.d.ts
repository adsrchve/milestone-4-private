import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';
export declare class TransactionService {
    private prisma;
    constructor(prisma: PrismaService);
    private updateBalance;
    deposit(toAccountId: string, rawAmount: string): Promise<{
        type: import("@prisma/client").$Enums.TransactionType;
        id: string;
        createdAt: Date;
        amount: Prisma.Decimal;
        fromAccountId: string | null;
        toAccountId: string | null;
    }>;
    withdraw(fromAccountId: string, rawAmount: string): Promise<{
        type: import("@prisma/client").$Enums.TransactionType;
        id: string;
        createdAt: Date;
        amount: Prisma.Decimal;
        fromAccountId: string | null;
        toAccountId: string | null;
    }>;
    transfer(fromAccountId: string, toAccountId: string, rawAmount: string): Promise<{
        type: import("@prisma/client").$Enums.TransactionType;
        id: string;
        createdAt: Date;
        amount: Prisma.Decimal;
        fromAccountId: string | null;
        toAccountId: string | null;
    }>;
    getTransactions(): Promise<{
        type: import("@prisma/client").$Enums.TransactionType;
        id: string;
        createdAt: Date;
        amount: Prisma.Decimal;
        fromAccountId: string | null;
        toAccountId: string | null;
    }[]>;
    getTransaction(id: string): Promise<{
        type: import("@prisma/client").$Enums.TransactionType;
        id: string;
        createdAt: Date;
        amount: Prisma.Decimal;
        fromAccountId: string | null;
        toAccountId: string | null;
    } | null>;
}
