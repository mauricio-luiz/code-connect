import { Injectable } from '@nestjs/common';
import {
  AuthenticationRegistry,
  JwtBearerProvider,
  type JwtClaims,
} from '@nestjs/authentication';
import { UsersRepository } from '../users/users.repository.js';
import { toPublicUser } from '../users/users.service.js';
import type { PublicUser } from '../users/user.js';

@Injectable()
export class JwtAuth extends JwtBearerProvider<PublicUser> {
  constructor(
    private readonly users: UsersRepository,
    registry: AuthenticationRegistry,
  ) {
    super();
    registry.registerProvider(this);
  }

  validate(claims: JwtClaims): PublicUser | null {
    const user = claims.sub ? this.users.findById(claims.sub) : undefined;
    return user ? toPublicUser(user) : null;
  }
}
