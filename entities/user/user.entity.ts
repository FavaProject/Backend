import { ApiProperty } from '@nestjs/swagger'
import { User } from '@prisma/client'

export class UserEntity implements User {
  @ApiProperty()
  id: number

  @ApiProperty({ required: false })
  firstName: string

  @ApiProperty({ required: false })
  secondName: string

  @ApiProperty({ required: false })
  nickName: string

  @ApiProperty()
  password: string

  @ApiProperty()
  email: string
}
