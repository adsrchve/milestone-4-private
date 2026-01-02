"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const client_1 = require("@prisma/client");
const client_2 = require("@prisma/client");
let TransactionService = class TransactionService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async updateBalance(accountId, amount, mode) {
        const account = await this.prisma.account.findUnique({ where: { id: accountId } });
        if (!account)
            throw new common_1.NotFoundException('Account not found');
        if (mode === 'DEC' && account.balance.lessThan(amount))
            throw new common_1.BadRequestException('Insufficient Balance');
        return this.prisma.account.update({
            where: { id: accountId },
            data: {
                balance: mode === 'INC'
                    ? { increment: amount }
                    : { decrement: amount },
            },
        });
    }
    async deposit(toAccountId, rawAmount) {
        const amount = new client_1.Prisma.Decimal(rawAmount);
        await this.updateBalance(toAccountId, amount, 'INC');
        return this.prisma.transaction.create({
            data: {
                amount,
                type: client_2.TransactionType.DEPOSIT,
                toAccountId,
            },
        });
    }
    async withdraw(fromAccountId, rawAmount) {
        const amount = new client_1.Prisma.Decimal(rawAmount);
        await this.updateBalance(fromAccountId, amount, 'DEC');
        return this.prisma.transaction.create({
            data: {
                amount,
                type: client_2.TransactionType.WITHDRAW,
                fromAccountId,
            },
        });
    }
    async transfer(fromAccountId, toAccountId, rawAmount) {
        const amount = new client_1.Prisma.Decimal(rawAmount);
        await this.updateBalance(fromAccountId, amount, 'DEC');
        await this.updateBalance(toAccountId, amount, 'INC');
        return this.prisma.transaction.create({
            data: {
                amount,
                type: client_2.TransactionType.TRANSFER,
                fromAccountId,
                toAccountId,
            },
        });
    }
    async getTransactions() {
        return this.prisma.transaction.findMany();
    }
    async getTransaction(id) {
        return this.prisma.transaction.findUnique({ where: { id } });
    }
};
exports.TransactionService = TransactionService;
exports.TransactionService = TransactionService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], TransactionService);
//# sourceMappingURL=transaction.service.js.map