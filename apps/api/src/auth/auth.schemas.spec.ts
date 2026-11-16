import { createTokenSchema } from './auth.schemas.js';

describe('createTokenSchema', () => {
  it('accepts valid credentials', () => {
    expect(createTokenSchema.safeParse({ email: 'a@b.co', password: 'x' }).success).toBe(true);
  });

  it.each([
    ['invalid email', { email: 'nope', password: 'x' }],
    ['empty password', { email: 'a@b.co', password: '' }],
    ['missing fields', {}],
  ])('rejects %s', (_label, payload) => {
    expect(createTokenSchema.safeParse(payload).success).toBe(false);
  });
});
