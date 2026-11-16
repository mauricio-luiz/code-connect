import { UnauthorizedException } from '@nestjs/common';
import { PasswordHasher, type TokenService } from '@nestjs/authentication';
import { UsersRepository } from '../users/users.repository.js';
import { AuthService } from './auth.service.js';

describe('AuthService', () => {
  const hasher = new PasswordHasher({ logN: 10 });
  let repository: UsersRepository;
  let tokens: { issue: ReturnType<typeof vi.fn> };
  let service: AuthService;

  beforeEach(async () => {
    repository = new UsersRepository();
    repository.create({
      name: 'Ana',
      email: 'ana@example.com',
      passwordHash: await hasher.hash('password123'),
    });
    tokens = { issue: vi.fn().mockResolvedValue({ accessToken: 'jwt', expiresIn: 900 }) };
    service = new AuthService(repository, hasher, tokens as unknown as TokenService);
  });

  it('issues a bearer token for valid credentials', async () => {
    const result = await service.createToken({ email: 'ANA@example.com', password: 'password123' });
    expect(result).toEqual({ accessToken: 'jwt', tokenType: 'Bearer', expiresIn: 900 });
    expect(tokens.issue).toHaveBeenCalledWith(expect.any(String), { method: 'password' });
  });

  it('rejects wrong password and unknown email with the same 401', async () => {
    const wrong = await service
      .createToken({ email: 'ana@example.com', password: 'bad-password' })
      .catch((e: unknown) => e);
    const unknown = await service
      .createToken({ email: 'x@example.com', password: 'password123' })
      .catch((e: unknown) => e);
    expect(wrong).toBeInstanceOf(UnauthorizedException);
    expect(unknown).toBeInstanceOf(UnauthorizedException);
    expect((wrong as Error).message).toBe((unknown as Error).message);
    expect(tokens.issue).not.toHaveBeenCalled();
  });
});
