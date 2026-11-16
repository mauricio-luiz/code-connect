import { AuthController } from './auth.controller.js';
import type { AuthService } from './auth.service.js';

describe('AuthController', () => {
  it('createToken returns the token response from the service', async () => {
    const response = { accessToken: 'jwt', tokenType: 'Bearer' as const, expiresIn: 900 };
    const service = { createToken: vi.fn().mockResolvedValue(response) };
    const controller = new AuthController(service as unknown as AuthService);

    const body = { email: 'ana@example.com', password: 'password123' };
    await expect(controller.createToken(body)).resolves.toEqual(response);
    expect(service.createToken).toHaveBeenCalledWith(body);
  });
});
