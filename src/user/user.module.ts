import { Module } from '@nestjs/common'
import { UserService } from './user.service'
import { PrismaModule } from '../prisma/prisma.module'

@Module({
  providers: [UserService],
  imports: [PrismaModule],
})
export class UserModule {}