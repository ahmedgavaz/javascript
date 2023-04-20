import { UserAlreadyExistError } from "../../src/errors"
import { UserModel } from "../../src/models/user-model"
import { UserService } from "../../src/services/user-service"
import { createUser } from "../support/factories"

describe('UserService', () => {
  describe('#register', () => {
    it('inserts the new user into the database', async () => {
      const userService = new UserService();

      await userService.registration('Maria','1234','mimi@gmail.com',22);

      const user = await UserModel.query().findOne({ email: 'mimi@gmail.com' })

      expect(user!.name).toEqual('Maria')
      expect(user!.age).toEqual(22)
    })

    it('throws an error when the email already exists', async () => {
      const userService = new UserService()

      await createUser({ email: 'mimi1@gmail.com' })
      await expect(async () => {
        await userService.registration('Maria','1234','mimi1@gmail.com',22);
      }).rejects.toThrow(UserAlreadyExistError)
    })
  })
  describe('#login', () => {
    it('log in ixisting user', async () => {
      const userService = new UserService();

      await userService.registration('Maria','1234','mimi@gmail.com',22);

      const user = await userService.login('mimi@gmail.com','1234')

      expect(user!.name).toEqual('Maria')
      expect(user!.age).toEqual(22)
    })

    it('does not login unexisting user', async () => {
      const userService = new UserService();
      const user = await userService.login('mimi@gmail.com','1234')
      expect(user).toEqual(null);
    })
    it('does not login user with wrong password', async () => {
      const userService = new UserService();
      await userService.registration('Maria','1234','mimi@gmail.com',22);
      const user = await userService.login('mimi@gmail.com','sdfsdf')
      expect(user).toEqual(null);
    })
    it('does not login user with wrong email', async () => {
      const userService = new UserService();
      await userService.registration('Maria','1234','mimi@gmail.com',22);
      const user = await userService.login('mimi1@gmail.com','1234')
      expect(user).toEqual(null);
    })
  })
})

