import { IsDecimal, IsOptional } from 'class-validator';

export class UpdateAccountDto {
    @IsOptional()
    balance?: string;
}
