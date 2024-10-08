import { ApiProperty } from '@nestjs/swagger'

export class UserEntity {
  @ApiProperty()
  id: number

  @ApiProperty({ required: false })
  firstName?: string

  @ApiProperty({ required: false })
  secondName?: string

  @ApiProperty({ required: false })
  nickName?: string

  @ApiProperty()
  password: string

  @ApiProperty()
  email: string
}
