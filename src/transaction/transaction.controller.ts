import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';

@Controller('transactions')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @Post('deposit')
  deposit(@Body() dto: CreateTransactionDto) {
    return this.transactionService.deposit(dto.toAccountId!, dto.amount);
  }

  @Post('withdrawn')
  withdrawn(@Body() dto: CreateTransactionDto) {
    return this.transactionService.withdrawn(dto.fromAccountId!, dto.amount);
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
  getOne(@Param('id', ParseIntPipe) id: number) {
    return this.transactionService.getTransaction(id);
  }
}
