import { createParamDecorator } from '@nestjs/common';
import { User } from '@src/user/user.entity';

export const GetUser = createParamDecorator(
  (_, request): User => {
    const { user } = request.args[0];
    return user;
  },
);
