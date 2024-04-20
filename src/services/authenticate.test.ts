import { expect, test, describe } from "vitest";
import { InMemoryUserRepository } from "@/repositories/in-memory/in-memory-user-repository";
import { AuthenticateService } from "./authenticate";
import { hash } from "bcryptjs";
import { InvalidCredentialsError } from "./errors/invalid-credentials-error";

describe("Authenticate Service", () => {
  test("should be able to authenticate", async () => {
    const usersRepository = new InMemoryUserRepository();
    const authenticateService = new AuthenticateService(usersRepository);

    await usersRepository.create({
      name: "Jhon Doe",
      email: "email@gmail.com",
      password_hash: await hash("123456", 6),
    });

    const { user } = await authenticateService.execute({
      email: "email@gmail.com",
      password: "123456",
    });

    expect(user.id).toEqual(expect.any(String));
  });

  test("should be able to authenticate with wrong e-mail", async () => {
    const usersRepository = new InMemoryUserRepository();
    const authenticateService = new AuthenticateService(usersRepository);

    expect(() =>
      authenticateService.execute({
        email: "email@gmail.com",
        password: "123456",
      })
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  });

  test("should be able to authenticate with wrong password", async () => {
    const usersRepository = new InMemoryUserRepository();
    const authenticateService = new AuthenticateService(usersRepository);

    await usersRepository.create({
      name: "Jhon Doe",
      email: "email@gmail.com",
      password_hash: await hash("123456", 6),
    });

    await expect(() =>
      authenticateService.execute({
        email: "email@gmail.com",
        password: "123123",
      })
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  });
});
