import { Injectable } from '@nestjs/common'
import { Prisma, User } from '@prisma/client'
import { compareSync, genSaltSync, hashSync } from 'bcrypt'
import { PrismaService } from '../prisma/prisma.service'

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  /**
   * @todo create userDTO by using Swagger
   */
  createUser(userData: Prisma.UserCreateInput): Promise<User> {
    userData.password = this._cryptPassword(userData.password)
    return this.prisma.user.create({ data: userData })
  }

  _cryptPassword(password: string): string {
    const salt: string = genSaltSync()
    return hashSync(password, salt)
  }

  _comparePassword(inputPassword, encryptedPassword): boolean {
    return compareSync(inputPassword, encryptedPassword)
  }
}
