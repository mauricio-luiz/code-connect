import type { Response } from 'express';
import { UsersController } from './users.controller.js';
import type { UsersService } from './users.service.js';
import type { PublicUser } from './user.js';

describe('UsersController', () => {
  const user: PublicUser = {
    id: '3f0c1c1e-8d2b-4b43-9a53-0d4b6f6f1a11',
    name: 'Ana',
    email: 'ana@example.com',
    createdAt: new Date('2026-01-01T00:00:00Z'),
  };

  it('create delegates to the service and sets Location', async () => {
    const service = { create: vi.fn().mockResolvedValue(user) };
    const controller = new UsersController(service as unknown as UsersService);
    const setHeader = vi.fn();
    const res = { setHeader } as unknown as Response;

    const body = { name: 'Ana', email: 'ana@example.com', password: 'password123' };
    const result = await controller.create(body, res);

    expect(service.create).toHaveBeenCalledWith(body);
    expect(setHeader).toHaveBeenCalledWith('Location', '/users/me');
    expect(result).toEqual({
      id: user.id,
      name: 'Ana',
      email: 'ana@example.com',
      createdAt: '2026-01-01T00:00:00.000Z',
    });
  });

  it('me returns the authenticated user', () => {
    const controller = new UsersController({} as UsersService);
    expect(controller.me(user)).toMatchObject({ id: user.id, email: user.email });
  });
});
