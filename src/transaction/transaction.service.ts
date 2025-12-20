import { Injectable } from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { TransactionType } from '@prisma/client';

@Injectable()
export class TransactionService {
  constructor(private prisma: PrismaService) {}

  // Deposit
  async deposit(toAccountId: number, amount: number) {
    await this.prisma.account.update({
      where: { id: toAccountId },
      data: { balance: { increment: amount } },
    });

    return this.prisma.transaction.create({
      data: {
        amount,
        type: TransactionType.DEPOSIT,
        toAccountId,
      },
    });
  }

  // Withdrawn
  async withdrawn(fromAccountId: number, amount: number) {
    const account = await this.prisma.account.findUnique({
      where: { id: fromAccountId },
    });

    if(!account || account.balance < amount) {
      throw new Error('Insufficient balance');
    }

    await this.prisma.account.update({
      where: { id: fromAccountId },
      data: { balance: { decrement: amount } },
    });

    return this.prisma.transaction.create({
      data: {
        amount,
        type: TransactionType.WITHDRAWAL,
        fromAccountId,
      },
    });
  }

  // Transfer
  async transfer(fromAccountId: number, toAccountId: number, amount: number) {
    const fromAccount = await this.prisma.account.findUnique({ where: { id: fromAccountId } });
  
    if (!fromAccount || fromAccount.balance < amount) {
      throw new Error('Insufficient balance');
    }

    await this.prisma.account.update({
      where: { id: fromAccountId },
      data: { balance: { decrement: amount } },
    });

    return this.prisma.transaction.create({
      data: {
        amount,
        type: TransactionType.TRANSFER,
        fromAccountId,
        toAccountId,
      },
    });
  }

  async getTransactions() {
    return this.prisma.transaction.findMany();
  }

  async getTransaction(id: number) {
    return this.prisma.transaction.findUnique({ where: { id } });
  }
}
