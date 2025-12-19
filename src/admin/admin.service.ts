import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AdminService {
  constructor(private prisma: PrismaService) {}

  getAllUsers() {
    return this.prisma.user.findMany();
  }

  getAllTransactions() {
    return this.prisma.transaction.findMany({
      include: {
        fromAccount: true,
        toAccount: true,
      },
    });
  }
}
