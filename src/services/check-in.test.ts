import { expect, test, describe, beforeEach } from "vitest";
import { hash } from "bcryptjs";
import { GetUserProfileService } from "./get-user-profile";
import { InMemoryCheckInsRepository } from "@/repositories/in-memory/in-memory-check-ins-repository";
import { CheckInService } from "./check-in";

let checkInsRepository: InMemoryCheckInsRepository;
let checkInService: CheckInService;

describe("CheckIn Service", () => {
  beforeEach(() => {
    checkInsRepository = new InMemoryCheckInsRepository();
    checkInService = new CheckInService(checkInsRepository);
  });

  test("should be able to check in", async () => {
    const { checkIn } = await checkInService.execute({
      gymId: "gym-1",
      userId: "user-1",
    });

    expect(checkIn.id).toEqual(expect.any(String));
  });
});
