import { TransactionService } from './transaction.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
export declare class TransactionController {
    private readonly transactionService;
    constructor(transactionService: TransactionService);
    deposit(dto: CreateTransactionDto): Promise<{
        type: import("@prisma/client").$Enums.TransactionType;
        id: string;
        createdAt: Date;
        amount: import("@prisma/client/runtime/library").Decimal;
        fromAccountId: string | null;
        toAccountId: string | null;
    }>;
    withdraw(dto: CreateTransactionDto): Promise<{
        type: import("@prisma/client").$Enums.TransactionType;
        id: string;
        createdAt: Date;
        amount: import("@prisma/client/runtime/library").Decimal;
        fromAccountId: string | null;
        toAccountId: string | null;
    }>;
    transfer(dto: CreateTransactionDto): Promise<{
        type: import("@prisma/client").$Enums.TransactionType;
        id: string;
        createdAt: Date;
        amount: import("@prisma/client/runtime/library").Decimal;
        fromAccountId: string | null;
        toAccountId: string | null;
    }>;
    getAll(): Promise<{
        type: import("@prisma/client").$Enums.TransactionType;
        id: string;
        createdAt: Date;
        amount: import("@prisma/client/runtime/library").Decimal;
        fromAccountId: string | null;
        toAccountId: string | null;
    }[]>;
    getOne(id: string): Promise<{
        type: import("@prisma/client").$Enums.TransactionType;
        id: string;
        createdAt: Date;
        amount: import("@prisma/client/runtime/library").Decimal;
        fromAccountId: string | null;
        toAccountId: string | null;
    } | null>;
}
