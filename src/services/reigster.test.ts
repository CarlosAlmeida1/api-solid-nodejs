import { expect, test, describe, beforeEach } from "vitest";
import { RegisterService } from "./register";
import { compare } from "bcryptjs";
import { InMemoryUserRepository } from "@/repositories/in-memory/in-memory-user-repository";
import { UserAlreadyExistsError } from "./errors/user-already-exists-error";

let usersRepository: InMemoryUserRepository;
let registerService: RegisterService;

describe("Register Service", () => {
  beforeEach(() => {
    usersRepository = new InMemoryUserRepository();
    registerService = new RegisterService(usersRepository);
  });

  test("should be able to register", async () => {
    const { user } = await registerService.execute({
      name: "Jhon doe",
      email: "email@gmail.com",
      password: "123456",
    });

    expect(user.id).toEqual(expect.any(String));
  });

  test("should hash user password upon registration", async () => {
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
