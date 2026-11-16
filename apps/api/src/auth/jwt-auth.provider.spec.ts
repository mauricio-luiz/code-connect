import type { AuthenticationRegistry } from '@nestjs/authentication';
import { UsersRepository } from '../users/users.repository.js';
import { JwtAuth } from './jwt-auth.provider.js';

describe('JwtAuth', () => {
  const registry = { registerProvider: vi.fn() };
  let repository: UsersRepository;
  let provider: JwtAuth;

  beforeEach(() => {
    repository = new UsersRepository();
    provider = new JwtAuth(repository, registry as unknown as AuthenticationRegistry);
  });

  it('registers itself in the registry', () => {
    expect(registry.registerProvider).toHaveBeenCalledWith(provider);
  });

  it('returns the public user for a known sub', () => {
    const user = repository.create({ name: 'Ana', email: 'ana@example.com', passwordHash: 'h' });
    const result = provider.validate({ sub: user.id });
    expect(result).toMatchObject({ id: user.id, email: 'ana@example.com' });
    expect(result).not.toHaveProperty('passwordHash');
  });

  it('returns null for unknown or missing sub', () => {
    expect(provider.validate({ sub: 'missing' })).toBeNull();
    expect(provider.validate({})).toBeNull();
  });
});
