import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PasswordHasher, TokenService } from '@nestjs/authentication';
import { UsersRepository } from '../users/users.repository.js';
import type { CreateTokenInput, TokenResponse } from './auth.schemas.js';

@Injectable()
export class AuthService {
  constructor(
    private readonly users: UsersRepository,
    private readonly hasher: PasswordHasher,
    private readonly tokens: TokenService,
  ) {}

  async createToken({ email, password }: CreateTokenInput): Promise<TokenResponse> {
    const user = this.users.findByEmail(email);
    // verify() runs against a dummy hash when the user is unknown, so timing is uniform.
    const valid = await this.hasher.verify(password, user?.passwordHash);
    if (!user || !valid) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const { accessToken, expiresIn } = await this.tokens.issue(user.id, {
      method: 'password',
    });
    return { accessToken, tokenType: 'Bearer', expiresIn };
  }
}
