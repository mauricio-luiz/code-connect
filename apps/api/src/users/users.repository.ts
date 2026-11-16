import { Injectable } from '@nestjs/common';
import { randomUUID } from 'node:crypto';
import type { User } from './user.js';

@Injectable()
export class UsersRepository {
  private readonly users: User[] = [];

  create(data: Pick<User, 'name' | 'email' | 'passwordHash'>): User {
    const user: User = {
      id: randomUUID(),
      name: data.name,
      email: data.email.toLowerCase(),
      passwordHash: data.passwordHash,
      createdAt: new Date(),
    };
    this.users.push(user);
    return user;
  }

  findById(id: string): User | undefined {
    return this.users.find((user) => user.id === id);
  }

  findByEmail(email: string): User | undefined {
    const normalized = email.toLowerCase();
    return this.users.find((user) => user.email === normalized);
  }
}
