import { Test, TestingModule } from '@nestjs/testing'
import { UserController } from '../../src/user/user.controller'
import { prismaUser } from './usersMockData'
import { MockFunctionMetadata, ModuleMocker } from 'jest-mock'
import { UserService } from '../../src/user/user.service'
import { PrismaService } from '../../src/prisma/prisma.service'

const moduleMocker = new ModuleMocker(global)

describe('UserController', () => {
  let userController: UserController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [UserService],
    })
      .useMocker(token => {
        if (token === PrismaService) {
          return prismaUser
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

  it('Create user', async () => {
    const email = 'new.user@gmail.com'
    const password = 'newPassword'
    const createdUser = await userController.create({
      email,
      password,
    })

    expect(createdUser).toHaveProperty('id')
    expect(createdUser).toHaveProperty('email', email)
    expect(createdUser).toHaveProperty('password')
  })
})
