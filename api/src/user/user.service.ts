import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserInput, UpdateUserInput } from './user.types';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async findUserById(userId: string): Promise<User> {
    const user = await this.userRepository.findOne(userId);

    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }

    return user;
  }

  async findUserByEmail(email: string): Promise<User> {
    const user = await this.userRepository.findOne({ where: { email } });

    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }

    return user;
  }

  async createUser(userInput: CreateUserInput): Promise<User> {
    const { email, password, role } = userInput;

    const issetUser = await this.userRepository.findOne({
      where: { email },
    });

    if (issetUser) {
      throw new BadRequestException(
        'Este e-mail já está cadastrado no servidor.',
      );
    }

    const newUser = this.userRepository.create({
      email,
      password,
      role: role || 'Default',
    });

    await this.userRepository.save(newUser);

    return newUser;
  }

  async updateUser(
    userId: string,
    updateUserInput: UpdateUserInput,
  ): Promise<User> {
    const currentUser = await this.userRepository.findOne(userId);

    if (!currentUser) {
      throw new NotFoundException('Usuário não encontrado ou inexistente');
    }

    const { affected: RowsUpdated } = await this.userRepository.update(
      { id: userId },
      updateUserInput,
    );

    if (RowsUpdated <= 0) {
      return currentUser;
    }

    return {
      ...currentUser,
      ...updateUserInput,
    };
  }
}
