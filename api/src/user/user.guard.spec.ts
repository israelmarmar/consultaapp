import { UserPasswordGuard } from './user.password.guard';

describe('UserGuard', () => {
  it('should be defined', () => {
    expect(new UserPasswordGuard()).toBeDefined();
  });
});
