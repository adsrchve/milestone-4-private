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
exports.AccountService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const client_1 = require("@prisma/client");
let AccountService = class AccountService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    create(userId, dto) {
        return this.prisma.account.create({
            data: { ...dto, userId, balance: new client_1.Prisma.Decimal(0) },
        });
    }
    async findAll(userId) {
        return this.prisma.account.findMany({ where: { userId } });
    }
    async findOne(userId, id) {
        const account = await this.prisma.account.findFirst({
            where: { id, userId },
        });
        if (!account)
            throw new common_1.NotFoundException('Account not found');
        return account;
    }
    async update(userId, id, dto) {
        await this.findOne(userId, id);
        return this.prisma.account.update({
            where: { id },
            data: dto,
        });
    }
    async remove(userId, id) {
        await this.findOne(userId, id);
        return this.prisma.account.delete({ where: { id } });
    }
};
exports.AccountService = AccountService;
exports.AccountService = AccountService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], AccountService);
//# sourceMappingURL=account.service.js.map