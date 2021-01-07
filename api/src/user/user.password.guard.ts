import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import bcrypt from 'bcryptjs';

@Injectable()
export class UserPasswordGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const { body } = context.switchToHttp().getRequest();

    const { user } = body;

    const { password } = user;

    if (!password) {
      return true;
    }

    const hashedPassword = await bcrypt.hash(password, 8);

    context.switchToHttp().getRequest().body.user.password = hashedPassword;

    return true;
  }
}
