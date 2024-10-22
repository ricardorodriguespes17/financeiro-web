import { describe, test, expect } from 'vitest'
import AuthController from '../../src/controller/authController'
import { CreateUserAccount } from '../../src/@types/UserType'

describe('API', () => {
  test('create user account corrrectly', async () => {
    const userData: CreateUserAccount = {
      name: "Daniel Murilo Novaes",
      birthdate: "1975-05-20",
      email: "daniel_novaes@juliosimoes.com.br",
      password: "uoDx3nTofk"
    }

    const response = await AuthController.createAccount(userData)

    expect(response.type).toBe("success")
  })

  test('should return error on try create account with invalid name', async () => {
    const userData: CreateUserAccount = {
      name: "Da",
      birthdate: "1975-05-20",
      email: "daniel_novaes@juliosimoes.com.br",
      password: "uoDx3nTofk"
    }

    const response = await AuthController.createAccount(userData)

    expect(response.type).toBe("error")
  })

  test('should return error on try create account with invalid birthdate', async () => {
    const userData: CreateUserAccount = {
      name: "Daniel Murilo Novaes",
      birthdate: "1975",
      email: "daniel_novaes@juliosimoes.com.br",
      password: "uoDx3nTofk"
    }

    const response = await AuthController.createAccount(userData)

    expect(response.type).toBe("error")
  })

  test('should return error on try create account with invalid email', async () => {
    const userData: CreateUserAccount = {
      name: "Daniel Murilo Novaes",
      birthdate: "1975-05-20",
      email: "daniel_novaes",
      password: "uoDx3nTofk"
    }

    const response = await AuthController.createAccount(userData)

    expect(response.type).toBe("error")
  })

  test('should return error on try create account with invalid password', async () => {
    const userData: CreateUserAccount = {
      name: "Daniel Murilo Novaes",
      birthdate: "1975-05-20",
      email: "daniel_novaes",
      password: "123"
    }

    const response = await AuthController.createAccount(userData)

    expect(response.type).toBe("error")
  })
})
