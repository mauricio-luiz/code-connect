import { ConflictException } from '@nestjs/common';
import { PasswordHasher } from '@nestjs/authentication';
import { UsersRepository } from './users.repository.js';
import { toUserResponse, UsersService } from './users.service.js';

describe('UsersService', () => {
  let repository: UsersRepository;
  let service: UsersService;
  const input = { name: 'Ana', email: 'Ana@Example.com', password: 'password123' };

  beforeEach(() => {
    repository = new UsersRepository();
    service = new UsersService(repository, new PasswordHasher({ logN: 10 }));
  });

  it('stores a hashed password and returns a public user without the hash', async () => {
    const user = await service.create(input);
    expect(user).not.toHaveProperty('passwordHash');
    const stored = repository.findById(user.id)!;
    expect(stored.passwordHash).not.toBe(input.password);
    expect(stored.email).toBe('ana@example.com');
  });

  it('rejects a duplicated email with 409', async () => {
    await service.create(input);
    await expect(
      service.create({ ...input, email: 'ana@example.com' }),
    ).rejects.toBeInstanceOf(ConflictException);
  });

  it('serializes createdAt as ISO string', async () => {
    const user = await service.create(input);
    expect(toUserResponse(user).createdAt).toBe(user.createdAt.toISOString());
  });
});
