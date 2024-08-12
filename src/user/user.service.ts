import { Injectable } from '@nestjs/common'
import { compareSync, genSaltSync, hashSync } from 'bcrypt'
import { PrismaService } from '../prisma/prisma.service'
import { CreateUserDTO } from 'entities/user/create-user.dto'
import { UserEntity } from 'entities/user/user.entity'

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  createUser(createUserData: CreateUserDTO): Promise<UserEntity> {
    createUserData.password = this._cryptPassword(createUserData.password)
    return this.prisma.user.create({ data: createUserData })
  }

  async authUser({ email, password }: CreateUserDTO): Promise<UserEntity> {
    const finedUser = await this.prisma.user.findFirst({
      where: { email },
    })

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
}
