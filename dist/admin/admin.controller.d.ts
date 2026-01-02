import { AdminService } from './admin.service';
export declare class AdminController {
    private readonly adminService;
    constructor(adminService: AdminService);
    getAllUsers(): import("@prisma/client").Prisma.PrismaPromise<{
        email: string;
        password: string;
        name: string;
        id: string;
        role: import("@prisma/client").$Enums.Role;
        createdAt: Date;
    }[]>;
    getAllTransactions(): import("@prisma/client").Prisma.PrismaPromise<({
        fromAccount: {
            id: string;
            createdAt: Date;
            accountNumber: string;
            balance: import("@prisma/client/runtime/library").Decimal;
            updatedAt: Date;
            userId: string;
        } | null;
        toAccount: {
            id: string;
            createdAt: Date;
            accountNumber: string;
            balance: import("@prisma/client/runtime/library").Decimal;
            updatedAt: Date;
            userId: string;
        } | null;
    } & {
        type: import("@prisma/client").$Enums.TransactionType;
        id: string;
        createdAt: Date;
        amount: import("@prisma/client/runtime/library").Decimal;
        fromAccountId: string | null;
        toAccountId: string | null;
    })[]>;
}
