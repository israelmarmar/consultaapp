import { BadRequestException, NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { UserService } from './user.service';
import { CreateUserInput, UpdateUserInput } from './user.types';

describe('UserService', () => {
  let userService: UserService;
  let usersRepository: Repository<User>;

  let mockCreateUserInput: CreateUserInput;
  let mockFakeUser: User;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(User),
          useClass: Repository,
        },
      ],
    }).compile();

    userService = module.get<UserService>(UserService);
    usersRepository = module.get<Repository<User>>(getRepositoryToken(User));

    mockCreateUserInput = {
      email: 'valid-email',
      password: 'valid-password',
      role: 'Default',
    };

    mockFakeUser = {
      id: 'valid-id',
      email: 'valid-email',
      password: 'valid-password',
      role: 'Default',
      courses: null,
      created_at: new Date(),
      updated_at: new Date(),
    };
  });

  it('should be defined', () => {
    expect(userService).toBeDefined();
  });

  describe('Find User By Id', () => {
    it('should find user by id', async () => {
      jest
        .spyOn(usersRepository, 'findOne')
        .mockImplementationOnce(async () => mockFakeUser);

      const foundUser = await userService.findUserById('valid-id');

      expect(foundUser).toMatchObject({
        id: 'valid-id',
        email: 'valid-email',
        password: 'valid-password',
      });
    });

    it('should throw an NotFoundException if has no user', async () => {
      jest
        .spyOn(usersRepository, 'findOne')
        .mockImplementationOnce(async () => undefined);

      await expect(
        userService.findUserById('invalid-id'),
      ).rejects.toBeInstanceOf(NotFoundException);
    });
  });

  describe('Find User By email', () => {
    it('should find user by email', async () => {
      jest
        .spyOn(usersRepository, 'findOne')
        .mockImplementationOnce(async () => mockFakeUser);

      const foundUser = await userService.findUserByEmail('valid-email');

      expect(foundUser).toMatchObject({
        id: 'valid-id',
        email: 'valid-email',
        password: 'valid-password',
      });
    });

    it('should throw an NotFoundException if has no user', async () => {
      jest
        .spyOn(usersRepository, 'findOne')
        .mockImplementationOnce(async () => undefined);

      await expect(
        userService.findUserByEmail('invalid-email'),
      ).rejects.toBeInstanceOf(NotFoundException);
    });
  });

  describe('Create User', () => {
    it('should create user', async () => {
      jest
        .spyOn(usersRepository, 'findOne')
        .mockImplementationOnce(async () => undefined);

      jest
        .spyOn(usersRepository, 'create')
        .mockImplementationOnce(() => mockFakeUser);

      jest
        .spyOn(usersRepository, 'save')
        .mockImplementationOnce(async () => mockFakeUser);

      const newUser = await userService.createUser(mockCreateUserInput);

      expect(newUser).toMatchObject({
        id: 'valid-id',
        email: 'valid-email',
        password: 'valid-password',
        role: 'Default',
      });
    });

    it('should create user with Default role', async () => {
      jest
        .spyOn(usersRepository, 'findOne')
        .mockImplementationOnce(async () => undefined);

      jest
        .spyOn(usersRepository, 'create')
        .mockImplementationOnce(() => mockFakeUser);

      jest
        .spyOn(usersRepository, 'save')
        .mockImplementationOnce(async () => mockFakeUser);

      delete mockCreateUserInput.role;

      const newUser = await userService.createUser(mockCreateUserInput);

      expect(newUser).toMatchObject({
        id: 'valid-id',
        email: 'valid-email',
        password: 'valid-password',
        role: 'Default',
      });
    });

    it('should throw error if user email already in use', async () => {
      jest
        .spyOn(usersRepository, 'findOne')
        .mockImplementationOnce(async () => mockFakeUser);

      await expect(
        userService.createUser(mockCreateUserInput),
      ).rejects.toBeInstanceOf(BadRequestException);
    });
  });

  describe('Update User', () => {
    let mockUpdateUserInput: UpdateUserInput;

    beforeEach(() => {
      mockUpdateUserInput = {
        email: 'another-valid-email',
        role: 'Default',
      };
    });

    it('should update user', async () => {
      jest
        .spyOn(usersRepository, 'findOne')
        .mockImplementationOnce(async () => mockFakeUser);

      jest
        .spyOn(usersRepository, 'update')
        .mockImplementationOnce(async () => ({
          generatedMaps: [],
          raw: 1,
          affected: 1,
        }));

      const updatedUser = await userService.updateUser(
        'valid-id',
        mockUpdateUserInput,
      );

      expect(updatedUser).toMatchObject({
        email: 'another-valid-email',
        role: 'Default',
      });
    });

    it('should throw NotFoundException if has no user', async () => {
      jest
        .spyOn(usersRepository, 'findOne')
        .mockImplementationOnce(async () => undefined);

      await expect(
        userService.updateUser('invalid-id', mockUpdateUserInput),
      ).rejects.toBeInstanceOf(NotFoundException);
    });

    it('should return old user if has no updates', async () => {
      jest
        .spyOn(usersRepository, 'findOne')
        .mockImplementationOnce(async () => mockFakeUser);

      jest
        .spyOn(usersRepository, 'update')
        .mockImplementationOnce(async () => ({
          generatedMaps: [],
          raw: 0,
          affected: 0,
        }));

      const updatedUser = await userService.updateUser(
        'valid-id',
        mockUpdateUserInput,
      );

      expect(updatedUser).toMatchObject({
        email: 'valid-email',
        password: 'valid-password',
        role: 'Default',
      });
    });
  });
});
