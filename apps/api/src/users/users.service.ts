import { ConflictException, Injectable } from '@nestjs/common';
import { PasswordHasher } from '@nestjs/authentication';
import { UsersRepository } from './users.repository.js';
import type { PublicUser, User } from './user.js';
import type { CreateUserInput, UserResponse } from './users.schemas.js';

export function toPublicUser(user: User): PublicUser {
  const { passwordHash: _passwordHash, ...publicUser } = user;
  return publicUser;
}

export function toUserResponse(user: PublicUser): UserResponse {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    createdAt: user.createdAt.toISOString(),
  };
}

@Injectable()
export class UsersService {
  constructor(
    private readonly repository: UsersRepository,
    private readonly hasher: PasswordHasher,
  ) {}

  async create(input: CreateUserInput): Promise<PublicUser> {
    if (this.repository.findByEmail(input.email)) {
      throw new ConflictException('Email already registered');
    }
    const passwordHash = await this.hasher.hash(input.password);
    const user = this.repository.create({
      name: input.name,
      email: input.email,
      passwordHash,
    });
    return toPublicUser(user);
  }
}
