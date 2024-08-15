import { Injectable } from '@nestjs/common'
import { compareSync, genSaltSync, hashSync } from 'bcrypt'
import { PrismaService } from '../prisma/prisma.service'
import { CreateUserDTO } from 'entities/user/create-user.dto'
import { UserEntity } from 'entities/user/user.entity'

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async createUser({ email, password }: CreateUserDTO): Promise<UserEntity> {
    const finedUser = await this._findUserByEmail(email)

    if (finedUser) {
      throw Error('User already exists')
    }

    password = this._cryptPassword(password)
    return this.prisma.user.create({ data: { email, password } })
  }

  async authUser({ email, password }: CreateUserDTO): Promise<UserEntity> {
    const finedUser: UserEntity = await this._findUserByEmail(email)

    if (!finedUser) {
      throw Error('User not found')
    }

    const encryptedPassword = finedUser.password

    if (this._comparePassword(password, encryptedPassword)) {
      return finedUser
    } else {
      throw Error('Wrong password')
    }
  }

  _cryptPassword(password: string): string {
    const salt: string = genSaltSync()
    return hashSync(password, salt)
  }

  _comparePassword(inputPassword, encryptedPassword): boolean {
    return compareSync(inputPassword, encryptedPassword)
  }

  _findUserByEmail(email: string): Promise<UserEntity> {
    return this.prisma.user.findFirst({ where: { email } })
  }
}
