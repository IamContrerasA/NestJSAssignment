import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { Connection, Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { NotFoundException } from '@nestjs/common';
import { UserRole } from './enum/user-enum';

type MockRepository<T = any> = Partial<Record<keyof Repository<T>, jest.Mock>>;
const createMockRepository = <T = any>(): MockRepository<T> => ({
  findOne: jest.fn(),
  create: jest.fn(),
  save: jest.fn(),
  preload: jest.fn(),
});

describe('UsersService', () => {
  let service: UsersService;
  let userRepository: MockRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        { provide: Connection, useValue: {} },
        {
          provide: getRepositoryToken(User),
          useValue: createMockRepository(),
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    userRepository = module.get<MockRepository>(getRepositoryToken(User));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findOne', () => {
    describe('when user with ID exists', () => {
      it('should return the user object', async () => {
        const userId = '1';
        const expectedUser = {};

        userRepository.findOne.mockReturnValue(expectedUser);
        const user = await service.findOne(userId);
        expect(user).toEqual(expectedUser);
      });
    });
    describe('otherwise', () => {
      it('should throw the "NotFoundException"', async (done) => {
        const userId = '1';
        userRepository.findOne.mockReturnValue(-1);

        try {
          await service.findOne(userId);
          done();
        } catch (err) {
          expect(err).toBeInstanceOf(NotFoundException);
          expect(err.message).toEqual(`User #${userId} not found`);
        }
      });
    });
  });

  describe('create', () => {
    it('should return the user object', async () => {
      const userData = {
        email: 'email@email.com',
        password: 'password',
        role: UserRole.CLIENT,
      };
      const expectedUser = undefined;

      userRepository.create.mockReturnValue(expectedUser);
      const user = await service.create(userData);
      expect(user).toEqual(expectedUser);
    });
  });

  describe('update', () => {
    it('should return the user updated', async () => {
      const id = '1';
      const userData = {
        email: 'email2@email.com',
        password: 'password',
        role: UserRole.CLIENT,
      };
      const expectedUser = {};

      userRepository.preload.mockReturnValue(expectedUser);
      const user = await service.update(id, userData);
      expect(user).toMatchInlineSnapshot(`undefined`);
    });
  });
});
