import { Test } from '@nestjs/testing';
import type { INestApplication } from '@nestjs/common';
import request from 'supertest';
import type { App } from 'supertest/types.js';
import { AppModule } from './../src/app.module.js';
import { setupApp } from './../src/app.setup.js';

describe('Users and auth (e2e)', () => {
  let app: INestApplication<App>;
  const user = { name: 'Ana', email: 'ana@example.com', password: 'password123' };

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({ imports: [AppModule] }).compile();
    app = moduleRef.createNestApplication();
    setupApp(app);
    await app.init();
  });

  afterEach(async () => {
    await app.close();
  });

  it('POST /users creates a user (201 + Location, no password)', async () => {
    const res = await request(app.getHttpServer()).post('/users').send(user).expect(201);
    expect(res.headers.location).toBe('/users/me');
    expect(res.body).toMatchObject({ name: 'Ana', email: 'ana@example.com' });
    expect(res.body).not.toHaveProperty('password');
    expect(res.body).not.toHaveProperty('passwordHash');
  });

  it('POST /users rejects duplicates (409) and invalid bodies (400)', async () => {
    await request(app.getHttpServer()).post('/users').send(user).expect(201);
    await request(app.getHttpServer()).post('/users').send(user).expect(409);
    await request(app.getHttpServer())
      .post('/users')
      .send({ ...user, email: 'bad', password: '1' })
      .expect(400);
  });

  it('POST /auth/tokens rejects bad credentials (401)', async () => {
    await request(app.getHttpServer()).post('/users').send(user).expect(201);
    await request(app.getHttpServer())
      .post('/auth/tokens')
      .send({ email: user.email, password: 'wrong-password' })
      .expect(401);
  });

  it('full flow: register, sign in, GET /users/me', async () => {
    await request(app.getHttpServer()).post('/users').send(user).expect(201);
    const tokenRes = await request(app.getHttpServer())
      .post('/auth/tokens')
      .send({ email: user.email, password: user.password })
      .expect(201);
    expect(tokenRes.body).toMatchObject({ tokenType: 'Bearer' });

    const me = await request(app.getHttpServer())
      .get('/users/me')
      .set('Authorization', `Bearer ${tokenRes.body.accessToken}`)
      .expect(200);
    expect(me.body).toMatchObject({ email: user.email, name: user.name });
  });

  it('GET /users/me without or with invalid token returns 401', async () => {
    await request(app.getHttpServer()).get('/users/me').expect(401);
    await request(app.getHttpServer())
      .get('/users/me')
      .set('Authorization', 'Bearer invalid.token.value')
      .expect(401);
  });
});
