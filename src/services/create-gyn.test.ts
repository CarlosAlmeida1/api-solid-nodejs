import { expect, test, describe, beforeEach } from "vitest";
import { CreateGymService } from "./create-gym";
import { InMemoryGymsRepository } from "@/repositories/in-memory/in-memory-gyms-repository";

let gymsRepository: InMemoryGymsRepository;
let gymsService: CreateGymService;

describe("Create Gym Service", () => {
  beforeEach(() => {
    gymsRepository = new InMemoryGymsRepository();
    gymsService = new CreateGymService(gymsRepository);
  });

  test("should be able to register", async () => {
    const { gym } = await gymsService.execute({
      title: "Aguas Claras",
      description: "",
      phone: null,
      latitude: -24.1850776,
      longitude: 53.0279882,
    });

    expect(gym.id).toEqual(expect.any(String));
  });
});
