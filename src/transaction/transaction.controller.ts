import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, UseGuards } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('transactions')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @Post('deposit')
  deposit(@Body() dto: CreateTransactionDto) {
    return this.transactionService.deposit(dto.toAccountId!, dto.amount);
  }

  @Post('withdraw')
  withdraw(@Body() dto: CreateTransactionDto) {
    return this.transactionService.withdraw(dto.fromAccountId!, dto.amount);
  }

  @Post('transfer')
  transfer(@Body() dto:CreateTransactionDto) {
    return this.transactionService.transfer(dto.fromAccountId!, dto.toAccountId!, dto.amount);
  }

  @Get()
  getAll() {
    return this.transactionService.getTransactions();
  }

  @Get(':id')
  getOne(@Param('id') id: string) {
    return this.transactionService.getTransaction(id);
  }
}
