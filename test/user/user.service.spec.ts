import { Test, TestingModule } from '@nestjs/testing'
import { UserService } from '../../src/user/user.service'
import { createUser } from './usersMockData'
import { PrismaService } from '../../src/prisma/prisma.service'
import { MockFunctionMetadata, ModuleMocker } from 'jest-mock'

const moduleMocker = new ModuleMocker(global)

describe('UserService', () => {
  let userService: UserService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserService],
    })
      .useMocker(token => {
        if (token === PrismaService) {
          return {
            user: {
              create: jest
                .fn()
                .mockImplementation(createUserData =>
                  createUser(createUserData),
                ),
            },
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

    userService = module.get<UserService>(UserService)
  })

  it('UserService should be defined', () => {
    expect(userService).toBeDefined()
  })

  it("Encrypted password shouldn't be equal original", () => {
    const originalPassword = 'password'
    const encryptedPassword: string =
      userService._cryptPassword(originalPassword)

    expect(encryptedPassword).not.toEqual(originalPassword)
  })

  it('Two encryptions of same password has different values', () => {
    const originalPassword = 'password'
    const firstCrypt: string = userService._cryptPassword(originalPassword)
    const secondCrypt: string = userService._cryptPassword(originalPassword)

    expect(firstCrypt).not.toEqual(secondCrypt)
  })

  it('Two different passwords has different encrypted values', () => {
    const firstPassword = 'password'
    const secondPassword = 'qwerty'

    const firstEncryptedPassword: string =
      userService._cryptPassword(firstPassword)
    const secondEncryptedPassword: string =
      userService._cryptPassword(secondPassword)

    expect(firstEncryptedPassword).not.toEqual(secondEncryptedPassword)
  })

  it('Compare encrypted password with original password return true', () => {
    const originalPassword = 'password'
    const encryptedPassword: string =
      userService._cryptPassword(originalPassword)
    const comparePassword: boolean = userService._comparePassword(
      originalPassword,
      encryptedPassword,
    )

    expect(comparePassword).toBe(true)
  })

  it('Compare encrypted password with other password return false', () => {
    const originalPassword = 'password'
    const encryptedPassword: string =
      userService._cryptPassword(originalPassword)

    const wrongPasswordInput = 'qwerty'
    const compareWrongPassword: boolean = userService._comparePassword(
      wrongPasswordInput,
      encryptedPassword,
    )

    expect(compareWrongPassword).toBe(false)
  })
})
