import { TransactionType } from "@prisma/client";
export declare class CreateTransactionDto {
    amount: string;
    type: TransactionType;
    fromAccountId?: string;
    toAccountId?: string;
}
