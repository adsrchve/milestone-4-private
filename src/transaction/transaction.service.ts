import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { TransactionType } from '@prisma/client';

@Injectable()
export class TransactionService {
  constructor(private prisma: PrismaService) {}

// lebih seragam, menjaga konsistensi codingan

  private async updateBalance(accountId: string, amount: Prisma.Decimal, mode: 'INC' | 'DEC') {
    const account = await this.prisma.account.findUnique({ where: { id: accountId }});
    if (!account) throw new NotFoundException('Account not found');

    if (mode === 'DEC' && account.balance.lessThan(amount))
      throw new BadRequestException('Insufficient Balance');

    return this.prisma.account.update({
      where: { id: accountId },
      data: {
        balance: mode === 'INC'
          ? { increment: amount }
          : { decrement: amount },
      },
    });
  }

  // Deposit
  async deposit(toAccountId: string, rawAmount: string) {
    const amount = new Prisma.Decimal(rawAmount);

    await this.updateBalance(toAccountId, amount, 'INC');

    return this.prisma.transaction.create({
      data: {
        amount,
        type: TransactionType.DEPOSIT,
        toAccountId,
      },
    });
  }

  // Withdraw
  async withdraw(fromAccountId: string, rawAmount: string) {
    const amount = new Prisma.Decimal(rawAmount);

    await this.updateBalance(fromAccountId, amount, 'DEC');

    return this.prisma.transaction.create({
      data: {
        amount,
        type: TransactionType.WITHDRAW,
        fromAccountId,
      },
    });
  }

  // Transfer
  async transfer(fromAccountId: string, toAccountId: string, rawAmount: string) {
    const amount = new Prisma.Decimal(rawAmount);
  
    await this.updateBalance(fromAccountId, amount, 'DEC');
    await this.updateBalance(toAccountId, amount, 'INC');

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

  async getTransaction(id: string) {
    return this.prisma.transaction.findUnique({ where: { id } });
  }
}
