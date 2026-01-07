import { Test, TestingModule } from '@nestjs/testing';
import { AccountService } from '../account/account.service';
import { PrismaService } from '../prisma/prisma.service';
import { ForbiddenException, NotFoundException } from '@nestjs/common';

describe('AccountService', () => {
  let service: AccountService;
  let prisma: any;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AccountService,
        {
          provide: PrismaService,
          useValue: {
            account: {
              create: jest.fn(),
              findMany: jest.fn(),
              findUnique: jest.fn(),
              update: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    service = module.get(AccountService);
    prisma = module.get(PrismaService);
  });

  it('should create new account', async () => {
    prisma.account.findUnique.mockResolvedValue(null);
    prisma.account.create.mockResolvedValue({
      id: '1',
      userId: '1',
      accountNumber: '1234567890',
      balance: { toNumber: () => 0 },
    });

    const result = await service.create('1');

    expect(result.accountNumber).toBe('1234567890');
    expect(result.balance).toBe(0);
  });

  it('should return all user accounts', async () => {
    prisma.account.findMany.mockResolvedValue([
      {
        id: '1',
        userId: '1',
        accountNumber: '111',
        balance: { toNumber: () => 50000 },
      },
    ]);

    const result = await service.findAll('1');

    expect(result.length).toBe(1);
    expect(result[0].balance).toBe(50000);
  });

  it('should return one account', async () => {
    prisma.account.findUnique.mockResolvedValue({
      id: '1',
      userId: '1',
      accountNumber: '111',
      balance: { toNumber: () => 100000 },
    });

    const result = await service.findOne('1', '1');

    expect(result.accountNumber).toBe('111');
  });

  it('should throw error when accessing other user account', async () => {
    prisma.account.findUnique.mockResolvedValue({
      id: '1',
      userId: '2',
      balance: { toNumber: () => 100000 },
    });

    await expect(service.findOne('1', '1')).rejects.toThrow(ForbiddenException);
  });

  it('should throw error when account not found', async () => {
    prisma.account.findUnique.mockResolvedValue(null);

    await expect(service.findOne('1', '1')).rejects.toThrow(NotFoundException);
  });

  it('should update balance', async () => {
    prisma.account.update.mockResolvedValue({});

    await service.updateBalance('1', 50000);

    expect(prisma.account.update).toHaveBeenCalled();
  });

  it('should get account balance', async () => {
    prisma.account.findUnique.mockResolvedValue({
      balance: { toNumber: () => 150000 },
    });

    const result = await service.getBalance('1');

    expect(result).toBe(150000);
  });

  it('should prevent user from accessing another user account', async () => {
    prisma.account.findUnique.mockResolvedValue({
        id: '1',
        userId: '2',
        balance: { toNumber: () => 100000 },
    });

    await expect(service.findOne('1', '1')).rejects.toThrow();
  });

});
