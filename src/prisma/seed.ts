import { Role, PrismaClient } from "@prisma/client";
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
    const hashedPassword = await bcrypt.hash('admin123', 10);

    await prisma.user.upsert({
        where: { email: 'admin@mail.com' },
        update: { role: Role.ADMIN },
        create: {
            email: 'admin@mail.com',
            name: 'Admin',
            password: hashedPassword,
            role: Role.ADMIN,
        },
    });

    console.log('Seed finished!');
}

main()
    .catch(e => console.error(e))
    .finally(async () => await prisma.$disconnect());