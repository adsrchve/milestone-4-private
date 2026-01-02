import request = require('supertest');
import { Test } from "@nestjs/testing";
import { INestApplication } from "@nestjs/common"
import { AppModule } from "src/app.module";

describe('User (e2e)', () => {
    let app: INestApplication;
    let token: string;

    const userData = {
        email: process.env.E2E_USER_EMAIL,
        password: process.env.E2E_USER_PASSWORD,
        name: process.env.E2E_USER_NAME
    };

    beforeAll(async () => {
        const ModuleFixture = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = ModuleFixture.createNestApplication();
        await app.init();

        await request(app.getHttpServer())
            .post('/auth/register')
            .send(userData);
        
        const loginRes = await request(app.getHttpServer())
            .post('auth/login')
            .send({
                email: userData.email,
                password: userData.password
            });

        token = loginRes.body.access_token;
    });

    afterAll(async () => {
        await app.close();
    });

    it('Get my profile', async () => {
        const res = await request(app.getHttpServer())
            .get('users/profile')
            .set('Authorization', `Bearer ${token}`)
            .expect(200);
        
        expect(res.body.email).toBe(userData.email);
        expect(res.body.name).toBe(userData.name);
    });

    it('Update my profile', async () => {
        const res = await request(app.getHttpServer())
            .patch('users/profile')
            .set('Authorization', `Bearer ${token}`)
            .send({ name: 'Updated User Testing' })
            .expect(200);
        
        expect(res.body.name).toBe('Updated User Testing');
    });

    it('Reject request without token', async () => {
        await request(app.getHttpServer())
            .get('users/profile')
            .expect(401);
    });
});