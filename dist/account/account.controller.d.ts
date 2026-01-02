import { AccountService } from './account.service';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
export declare class AccountController {
    private readonly accountService;
    constructor(accountService: AccountService);
    create(req: any, dto: CreateAccountDto): import("@prisma/client").Prisma.Prisma__AccountClient<{
        id: string;
        createdAt: Date;
        accountNumber: string;
        balance: import("@prisma/client/runtime/library").Decimal;
        updatedAt: Date;
        userId: string;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    findAll(req: any): Promise<{
        id: string;
        createdAt: Date;
        accountNumber: string;
        balance: import("@prisma/client/runtime/library").Decimal;
        updatedAt: Date;
        userId: string;
    }[]>;
    findOne(req: any, id: string): Promise<{
        id: string;
        createdAt: Date;
        accountNumber: string;
        balance: import("@prisma/client/runtime/library").Decimal;
        updatedAt: Date;
        userId: string;
    }>;
    update(req: any, id: string, dto: UpdateAccountDto): Promise<{
        id: string;
        createdAt: Date;
        accountNumber: string;
        balance: import("@prisma/client/runtime/library").Decimal;
        updatedAt: Date;
        userId: string;
    }>;
    remove(req: any, id: string): Promise<{
        id: string;
        createdAt: Date;
        accountNumber: string;
        balance: import("@prisma/client/runtime/library").Decimal;
        updatedAt: Date;
        userId: string;
    }>;
}
