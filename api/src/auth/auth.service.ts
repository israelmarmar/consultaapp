import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcryptjs';
import { User } from '../user/user.entity';
import { UserService } from '../user/user.service';
import { AuthUser, UserCrededentials } from './auth.types';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateCredentials({
    email,
    password,
  }: UserCrededentials): Promise<User> {
    let user: User;

    try {
      user = await this.userService.findUserByEmail(email);
    } catch {
      throw new UnauthorizedException('Credenciais inválidas');
    }

    if (!user) {
      throw new UnauthorizedException('Credenciais inválidas');
    }

    const passwordsMatch = await compare(password, user.password);

    if (!passwordsMatch) {
      throw new UnauthorizedException('Credenciais inválidas');
    }

    return user;
  }

  async login(userCredentials: UserCrededentials): Promise<AuthUser> {
    const user = await this.validateCredentials(userCredentials);

    const payload = { id: user.id };

    const token = this.jwtService.sign(payload);

    return {
      user,
      token,
    };
  }
}
