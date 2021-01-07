import { User } from '@src/user/user.entity';

export interface UserCrededentials {
  email: string;
  password: string;
}

export interface AuthUser {
  user: User;
  token: string;
}

export interface ValidationPayload {
  id: string;
  iat: number;
  exp: number;
}
