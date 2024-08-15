import { Test, TestingModule } from '@nestjs/testing'
import { UserService } from '../../src/user/user.service'
import { prismaUser } from './usersMockData'
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

    userService = module.get<UserService>(UserService)
  })

  it('UserService should be defined', () => {
    expect(userService).toBeDefined()
  })

  it("Encrypted password shouldn't be equal original", () => {
    const originalPassword = 'adminPassword'
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

  it('Auth input with correct email and password should return user', () => {
    const email = 'roman.nichi.o@gmail.com'
    const password = 'adminPassword'

    expect(() => userService.authUser({ email, password })).not.toThrow()
  })

  it('Auth input with incorrect email should return Error "User not found"', () => {
    const email = 'wrong.mail@gmail.com'
    const password = 'adminPassword'

    expect(() => userService.authUser({ email, password })).rejects.toThrow(
      'User not found',
    )
  })

  it('Auth input with incorrect password should return Error "Wrong password"', () => {
    const email = 'roman.nichi.o@gmail.com'
    const password = 'wrongPassword'

    expect(() => userService.authUser({ email, password })).rejects.toThrow(
      'Wrong password',
    )
  })
})
