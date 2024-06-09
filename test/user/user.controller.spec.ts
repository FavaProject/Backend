import { Test, TestingModule } from '@nestjs/testing'
import { UserController } from '../../src/user/user.controller'
import { createUser } from './usersMockData'
import { MockFunctionMetadata, ModuleMocker } from 'jest-mock'
import { UserService } from '../../src/user/user.service'

const moduleMocker = new ModuleMocker(global)

describe('UserController', () => {
  let userController: UserController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
    })
      .useMocker(token => {
        if (token === UserService) {
          return {
            createUser: jest
              .fn()
              .mockImplementation(createUserData => createUser(createUserData)),
          }
        }
        if (typeof token === 'function') {
          const mockMetadata = moduleMocker.getMetadata(
            token,
          ) as MockFunctionMetadata<any, any>
          const Mock = moduleMocker.generateFromMetadata(mockMetadata)
          return new Mock()
        }
      })
      .compile()

    userController = module.get<UserController>(UserController)
  })

  it('UserController should be defined', () => {
    expect(userController).toBeDefined()
  })
})
