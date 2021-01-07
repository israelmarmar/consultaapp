export interface CreateUserInput {
  email: string;

  password: string;

  role?: 'Default';
}

export interface UpdateUserInput {
  email: string;

  role?: 'Default';
}
