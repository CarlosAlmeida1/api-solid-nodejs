import { expect, test, describe } from "vitest";
import { RegisterService } from "./register";
import { compare } from "bcryptjs";
import { InMemoryUserRepository } from "@/repositories/in-memory/in-memory-user-repository";
import { UserAlreadyExistsError } from "./errors/user-already-exists-error";

describe("Register Service", () => {
  test("should be able to register", async () => {
    const usersRepository = new InMemoryUserRepository();
    const registerService = new RegisterService(usersRepository);

    const { user } = await registerService.execute({
      name: "Jhon doe",
      email: "email@gmail.com",
      password: "123456",
    });

    expect(user.id).toEqual(expect.any(String));
  });

  test("should hash user password upon registration", async () => {
    const usersRepository = new InMemoryUserRepository();
    const registerService = new RegisterService(usersRepository);

    const { user } = await registerService.execute({
      name: "Jhon doe",
      email: "email@gmail.com",
      password: "123456",
    });

    const isPasswordCorrectlyHashed = await compare(
      "123456",
      user.password_hash
    );

    expect(isPasswordCorrectlyHashed).toBe(true);
  });

  test("should not be able to register with same email twice", async () => {
    const usersRepository = new InMemoryUserRepository();
    const registerService = new RegisterService(usersRepository);

    const email = "email@gmail.com";

    await registerService.execute({
      name: "Jhon doe",
      email,
      password: "123456",
    });
    //resolve / reject

    //use o await quando o expect retorna uma promise
    await expect(() =>
      registerService.execute({
        name: "Jhon doe",
        email,
        password: "123456",
      })
    ).rejects.toBeInstanceOf(UserAlreadyExistsError);
  });
});
