import { CreateUserDTO } from '../../entities/user/create-user.dto'
import { UserEntity } from 'entities/user/user.entity'

export const users: UserEntity[] = [
  {
    id: 0,
    firstName: 'Роман',
    secondName: 'Ничипуренко',
    nickName: 'Nichi_Ro',
    email: 'roman.nichi.o@gmail.com',
    password: '$2b$10$hu5/Bf78UtIq7D2O.kvtLuCeD/WhC4ryMydvLMhuBCXYWkK242Utm',
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

export const prismaUser = {
  user: {
    create: (createPrismaParams: {
      data: CreateUserDTO
    }): Promise<UserEntity> => {
      const encryptedPassword =
        '$2a$10$pVGZ7C2Kr7Vnw4E1WGFAKeqc2GCS25kzGAKMv/Gm9QbpR7XEWobqi'

      return new Promise<UserEntity>(resolve => {
        const newUser: UserEntity = {
          id: 0,
          email: createPrismaParams.data.email,
          password: encryptedPassword,
        }

        users.push(newUser)

        resolve(newUser)
      })
    },

    findFirst: (params): Promise<UserEntity> => {
      return new Promise<UserEntity>(resolve => {
        const finedUser = users.find(user => {
          let rightParams = 0
          const whereParamsCount = Object.keys(params.where).length

          Object.keys(params.where).forEach(param => {
            if (user[param] === params.where[param]) {
              rightParams += 1
            }
          })

          return rightParams === whereParamsCount
        })

        resolve(finedUser)
      })
    },
  }
}
