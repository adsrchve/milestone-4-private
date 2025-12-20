import request = require('supertest');
import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { AppModule } from 'src/app.module';

describe('Auth (e2e)', () => {
    let app: INestApplication;

    beforeAll(async () => {
        const moduleRef = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleRef.createNestApplication();
        await app.init();
    })

    it('POST /auth/register - success', async() => {
        const email = `test_${Date.now()}@mail.com`;
        const password = `pw_${Date.now()}_!`;
        const name = `User_${Date.now()}`;

        const res = await request(app.getHttpServer())
            .post('/auth/register')
            .send({
                email,
                name,
                password,
            });

        expect(res.status).toBe(201);

        console.log(res.body);
    });

    it('POST /auth/login - success', async() => {
        const email = `test_${Date.now()}@mail.com`;
        const password = `pw_${Date.now()}_!`;
        const name = `User_${Date.now()}`;

        await request(app.getHttpServer())
            .post('/auth/register')
            .send({
                email,
                password,
                name,
            });

        const res = await request(app.getHttpServer())
            .post('/auth/login')
            .send({
                email,
                password,
            });

            expect(res.status).toBe(200);
            expect(res.body.access_token).toBeDefined();
    })

    afterAll(async() => {
        await app.close();
    });
});