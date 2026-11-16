import { createUserSchema } from './users.schemas.js';

describe('createUserSchema', () => {
  const valid = { name: 'Ana', email: 'ana@example.com', password: 'password123' };

  it('accepts a valid payload', () => {
    expect(createUserSchema.safeParse(valid).success).toBe(true);
  });

  it.each([
    ['invalid email', { ...valid, email: 'nope' }],
    ['short password', { ...valid, password: '1234567' }],
    ['empty name', { ...valid, name: '   ' }],
    ['missing field', { name: 'Ana', email: 'ana@example.com' }],
  ])('rejects %s', (_label, payload) => {
    expect(createUserSchema.safeParse(payload).success).toBe(false);
  });
});
