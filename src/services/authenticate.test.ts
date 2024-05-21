import { expect, test, describe, beforeEach } from "vitest";
import { InMemoryUserRepository } from "@/repositories/in-memory/in-memory-user-repository";
import { AuthenticateService } from "./authenticate";
import { hash } from "bcryptjs";
import { InvalidCredentialsError } from "./errors/invalid-credentials-error";

let usersRepository: InMemoryUserRepository;
let authenticateService: AuthenticateService;

describe("Authenticate Service", () => {
  beforeEach(() => {
    usersRepository = new InMemoryUserRepository();
    authenticateService = new AuthenticateService(usersRepository);
  });

  test("should be able to authenticate", async () => {
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

  test("should not be able to authenticate with wrong e-mail", async () => {
    await expect(() =>
      authenticateService.execute({
        email: "email@gmail.com",
        password: "123456",
      })
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  });

  test("should not be able to authenticate with wrong e-mail", async () => {
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
