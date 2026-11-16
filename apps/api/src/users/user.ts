export interface User {
  id: string;
  name: string;
  email: string;
  passwordHash: string;
  createdAt: Date;
}

export type PublicUser = Omit<User, 'passwordHash'>;

declare module '@nestjs/authentication' {
  interface AuthenticationTypes {
    user: PublicUser;
    refreshTokens: false;
  }
}
