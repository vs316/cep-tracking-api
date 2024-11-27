import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { AddressService } from '../address/address.service';

describe('UsersController', () => {
  let controller: UsersController;
  let usersServiceMock: Partial<UsersService>;
  let addressServiceMock: Partial<AddressService>;

  beforeEach(async () => {
    usersServiceMock = {
      // Mock methods used in UsersController, e.g.,
      findAll: jest.fn(),
    } as Partial<UsersService>;

    addressServiceMock = {
      // Mock methods used in UsersController, if any.
    } as Partial<AddressService>;

    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        { provide: UsersService, useValue: usersServiceMock },
        { provide: AddressService, useValue: addressServiceMock },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });
  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
