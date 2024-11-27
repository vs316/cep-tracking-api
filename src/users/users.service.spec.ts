import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { PrismaService } from '../prisma/prisma.service';

describe('UsersService', () => {
  let service: UsersService;
  let prismaServiceMock: Partial<PrismaService>;

  beforeEach(async () => {
    // Create a mock implementation of PrismaService
    prismaServiceMock = {
      user: {
        findMany: jest.fn(),
        findUnique: jest.fn(),
        findUniqueOrThrow: jest.fn(),
        findFirst: jest.fn(),
        findFirstOrThrow: jest.fn(),
        create: jest.fn(),
        createMany: jest.fn(),
        update: jest.fn(),
        updateMany: jest.fn(),
        upsert: jest.fn(),
        delete: jest.fn(),
        deleteMany: jest.fn(),
        aggregate: jest.fn(),
        groupBy: jest.fn(),
        count: jest.fn(),
        fields: {
          user_id: {
            name: 'user_id',
            modelName: 'user',
            typeName: 'Int',
            isList: false,
          },
          first_name: {
            name: 'first_name',
            modelName: 'user',
            typeName: 'String',
            isList: false,
          },
          last_name: {
            name: 'last_name',
            modelName: 'user',
            typeName: 'String',
            isList: false,
          },
          email: {
            name: 'email',
            modelName: 'user',
            typeName: 'String',
            isList: false,
          },
          uuid: {
            name: 'uuid',
            modelName: 'user',
            typeName: 'String',
            isList: false,
          },
          created_at: {
            name: 'created_at',
            modelName: 'user',
            typeName: 'DateTime',
            isList: false,
          },
          updated_at: {
            name: 'updated_at',
            modelName: 'user',
            typeName: 'DateTime',
            isList: false,
          },
          password: {
            name: 'password',
            modelName: 'user',
            typeName: 'String',
            isList: false,
          },
          phone_number: undefined,
          emailVerified: undefined,
          phoneVerified: undefined,
        },
      },
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        { provide: PrismaService, useValue: prismaServiceMock }, // Mock PrismaService
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should call prisma.user.findMany when getAllUsers is called', async () => {
    const mockUsers = [
      {
        user_id: 1,
        first_name: 'John',
        last_name: 'Doe',
        email: 'john@example.com',
      },
    ];
    (prismaServiceMock.user.findMany as jest.Mock).mockResolvedValue(mockUsers);

    const result = await service.getAllUsers();
    expect(prismaServiceMock.user.findMany).toHaveBeenCalled();
    expect(result).toEqual(mockUsers);
  });

  it('should call prisma.user.findUnique when getUser  is called', async () => {
    const mockUser = {
      user_id: 1,
      first_name: 'John',
      last_name: 'Doe',
      email: 'john@example.com',
    };
    (prismaServiceMock.user.findUnique as jest.Mock).mockResolvedValue(
      mockUser,
    );

    const result = await service.getUser('some-uuid');
    expect(prismaServiceMock.user.findUnique).toHaveBeenCalledWith({
      where: { uuid: 'some-uuid' },
    });
    expect(result).toEqual(mockUser);
  });

  it('should call prisma.user.create when createUser WithAddresses is called', async () => {
    const mockUser = {
      user_id: 1,
      first_name: 'Jane',
      last_name: 'Doe',
      email: 'jane@example.com',
      created_at: new Date(),
      updated_at: new Date(),
    };
    (prismaServiceMock.user.create as jest.Mock).mockResolvedValue(mockUser);

    const result = await service.createUserWithAddresses({
      ...mockUser,
      uuid: 'some-uuid',
      phone_number: '1234567890',
      password: 'password',
    });
    expect(prismaServiceMock.user.create).toHaveBeenCalled();
  });
});
