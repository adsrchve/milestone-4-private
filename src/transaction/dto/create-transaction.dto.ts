import { TransactionType } from "@prisma/client";
import { IsEnum, IsNotEmpty, IsUUID, IsOptional } from "class-validator";

export class CreateTransactionDto {
    @IsNotEmpty()
    amount: string;
    
    @IsEnum(TransactionType)
    type: TransactionType;

    @IsOptional()
    @IsUUID()
    fromAccountId?: string;
    
    @IsOptional()
    @IsUUID()
    toAccountId?: string;
}
