import { Test, TestingModule } from '@nestjs/testing';
import { TransactionService } from '../transaction/transaction.service';
import { PrismaService } from '../prisma/prisma.service';
import { BadRequestException } from '@nestjs/common';
import { TransactionType } from '@prisma/client';

describe('TransactionService', () => {
  let service: TransactionService;
  let prisma: any;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TransactionService,
        {
          provide: PrismaService,
          useValue: {
            account: {
              findUnique: jest.fn(),
              update: jest.fn(),
            },
            transaction: {
              create: jest.fn(),
              findMany: jest.fn(),
              findUnique: jest.fn(),
            },
            $transaction: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get(TransactionService);
    prisma = module.get(PrismaService);
  });

  it('should deposit money', async () => {
    prisma.account.findUnique.mockResolvedValue({
      id: 1,
      userId: '1',
      balance: { toNumber: () => 100000 },
    });

    prisma.$transaction.mockImplementation(async (cb) =>
      cb({
        transaction: {
          create: jest.fn().mockResolvedValue({
            id: 1,
            type: TransactionType.DEPOSIT,
            amount: { toNumber: () => 50000 },
            fromAccountId: null,
            toAccountId: 1,
          }),
        },
        account: {
          update: jest.fn(),
        },
      }),
    );

    const dto = { toAccountId: 1, amount: 50000 };

    const result = await service.deposit(0, 0, 0, dto as any, '1');

    expect(result.type).toBe(TransactionType.DEPOSIT);
    expect(result.amount).toBe(50000);
  });

  it('should throw error when withdrawing with insufficient balance', async () => {
    prisma.account.findUnique.mockResolvedValue({
      id: 1,
      userId: '1',
      balance: { toNumber: () => 10000 },
    });

    const dto = { fromAccountId: 1, amount: 50000 };

    await expect(service.withdraw(0, 0, 0, dto as any, '1')).rejects.toThrow(
      BadRequestException,
    );
  });

  it('should transfer money', async () => {
    prisma.account.findUnique
      .mockResolvedValueOnce({
        id: 1,
        userId: '1',
        balance: { toNumber: () => 200000 },
      })
      .mockResolvedValueOnce({
        id: 2,
        userId: '2',
        balance: { toNumber: () => 100000 },
      });

    prisma.$transaction.mockImplementation(async (cb) =>
      cb({
        transaction: {
          create: jest.fn().mockResolvedValue({
            id: 1,
            type: TransactionType.TRANSFER,
            amount: { toNumber: () => 50000 },
            fromAccountId: 1,
            toAccountId: 2,
          }),
        },
        account: {
          update: jest.fn(),
        },
      }),
    );

    const dto = { fromAccountId: 1, toAccountId: 2, amount: 50000 };

    const result = await service.transfer(0, 0, 0, 0, dto as any, '1');

    expect(result.type).toBe(TransactionType.TRANSFER);
    expect(result.amount).toBe(50000);
  });

  it('should prevent withdrawing more than balance', async () => {
    prisma.account.findUnique.mockResolvedValue({
        id: 1,
        userId: '1',
        balance: { toNumber: () => 30000 },
    });

    const dto = { fromAccountId: 1, amount: 50000 };

    await expect(service.withdraw(0, 0, 0, dto as any, '1'))
        .rejects.toThrow('Insufficient Balance');
  });

  it('should prevent transfer when balance is insufficient', async () => {
    prisma.account.findUnique.mockResolvedValue({
        id: 1,
        userId: '1',
        balance: { toNumber: () => 10000 },
    });

    const dto = { fromAccountId: 1, toAccountId: 2, amount: 50000 };

    await expect(service.transfer(0, 0, 0, 0, dto as any, '1'))
        .rejects.toThrow('Insufficient balance');
  });

  it('should prevent depositing to another user account', async () => {
    prisma.account.findUnique.mockResolvedValue({
        id: 1,
        userId: '2',
        balance: { toNumber: () => 100000 },
    });

    const dto = { toAccountId: 1, amount: 50000 };

    await expect(service.deposit(0, 0, 0, dto as any, '1'))
        .rejects.toThrow('You can only deposit to your own account');
  });



});
