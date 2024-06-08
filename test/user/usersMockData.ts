import { User } from '@prisma/client'

export const users: User[] = [
  {
    id: 0,
    firstName: 'Роман',
    secondName: 'Ничипуренко',
    nickName: 'Nichi_Ro',
    password: 'adminPassword',
  },
  {
    id: 1,
    firstName: 'Марика',
    secondName: 'Мейдра',
    nickName: 'Bambina',
    password: 'qwerty',
  },
]

export const createdUser: User = {
  id: 0,
  firstName: 'Роман',
  secondName: 'Ничипуренко',
  nickName: 'Nichi_Ro',
  password: 'adminPassword',
}
