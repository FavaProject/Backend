import { Body, Controller, Post } from '@nestjs/common'
import { CreateUserDTO } from 'entities/user/create-user.dto'
import { UserEntity } from 'entities/user/user.entity'
import { UserService } from './user.service'
import { ApiTags } from '@nestjs/swagger'

@Controller('user')
@ApiTags('user')
export class UserController {
  constructor(private _userService: UserService) {}

  @Post('create')
  create(@Body() createUserData: CreateUserDTO): Promise<UserEntity> {
    return this._userService.createUser(createUserData)
  }
}
