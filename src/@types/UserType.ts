export type UserType = {
  id: string
  name: string
  email: string
  birthdate: string
}

export type UpdateUserType = Omit<CreateUserAccount, "password">

export type CreateUserAccount = {
  name: string
  email: string
  password: string
  birthdate: string
}

export type LoginType = {
  email: string
  password: string
}