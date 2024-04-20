import { expect, test, describe, beforeEach } from "vitest";
import { InMemoryUserRepository } from "@/repositories/in-memory/in-memory-user-repository";
import { hash } from "bcryptjs";
import { GetUserProfileService } from "./get-user-profile";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";

let usersRepository: InMemoryUserRepository;
let getUserProfileService: GetUserProfileService;

describe("Authenticate Service", () => {
  beforeEach(() => {
    usersRepository = new InMemoryUserRepository();
    getUserProfileService = new GetUserProfileService(usersRepository);
  });

  test("should be able to get user profile", async () => {
    const createUser = await usersRepository.create({
      name: "Jhon Doe",
      email: "email@gmail.com",
      password_hash: await hash("123456", 6),
    });

    const { user } = await getUserProfileService.execute({
      userId: createUser.id,
    });

    expect(user.id).toEqual(expect.any(String));
    expect(user.name).toEqual("Jhon Doe");
  });

  test("should be able to get user profile with wrong id", async () => {
    expect(() =>
      getUserProfileService.execute({
        userId: "non-existing-id",
      })
    ).rejects.toBeInstanceOf(ResourceNotFoundError);
  });
});
