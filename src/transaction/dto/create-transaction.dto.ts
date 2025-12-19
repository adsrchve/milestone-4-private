import { IsNumber, IsOptional } from "class-validator";

export class CreateTransactionDto {
    @IsNumber()
    amount: number;
    
    @IsOptional()
    @IsNumber()
    fromAccountId?: number;
    
    @IsOptional()
    @IsNumber()
    toAccountId?: number;
}
