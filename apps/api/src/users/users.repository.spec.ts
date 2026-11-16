import { UsersRepository } from './users.repository.js';

describe('UsersRepository', () => {
  let repository: UsersRepository;
  const data = { name: 'Ana', email: 'Ana@Example.com', passwordHash: 'hash' };

  beforeEach(() => {
    repository = new UsersRepository();
  });

  it('creates a user with id, createdAt and lowercase email', () => {
    const user = repository.create(data);
    expect(user.id).toMatch(/^[0-9a-f-]{36}$/);
    expect(user.createdAt).toBeInstanceOf(Date);
    expect(user.email).toBe('ana@example.com');
  });

  it('finds by email case-insensitively', () => {
    const user = repository.create(data);
    expect(repository.findByEmail('ANA@example.COM')).toBe(user);
  });

  it('finds by id and returns undefined when unknown', () => {
    const user = repository.create(data);
    expect(repository.findById(user.id)).toBe(user);
    expect(repository.findById('missing')).toBeUndefined();
    expect(repository.findByEmail('none@example.com')).toBeUndefined();
  });

  it('does not share state between instances', () => {
    repository.create(data);
    expect(new UsersRepository().findByEmail(data.email)).toBeUndefined();
  });
});
