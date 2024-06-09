import { CreateUserDTO } from '../../entities/user/create-user.dto'
import { UserEntity } from 'entities/user/user.entity'

export const users: UserEntity[] = [
  {
    id: 0,
    firstName: 'Роман',
    secondName: 'Ничипуренко',
    nickName: 'Nichi_Ro',
    email: 'roman.nichi.o@gmail.com',
    password: 'adminPassword',
  },
  {
    id: 1,
    firstName: 'Марика',
    secondName: 'Мейдра',
    nickName: 'Bambina',
    email: 'meidra.marika2003@gmail.com',
    password: 'qwerty',
  },
]

export const createUser = (
  createUserData: CreateUserDTO,
): Promise<UserEntity> => {
  const encryptedPassword =
    '$2a$10$pVGZ7C2Kr7Vnw4E1WGFAKeqc2GCS25kzGAKMv/Gm9QbpR7XEWobqi'

  return new Promise<UserEntity>(resolve => {
    const newUser: UserEntity = {
      id: 0,
      email: createUserData.email,
      password: encryptedPassword,
    }

    resolve(newUser)
  })
}
