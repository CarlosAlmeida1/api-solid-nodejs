import { expect, test, describe, beforeEach, vi, afterEach } from "vitest";
import { InMemoryCheckInsRepository } from "@/repositories/in-memory/in-memory-check-ins-repository";
import { CheckInService } from "./check-in";
import { InMemoryGymsRepository } from "@/repositories/in-memory/in-memory-gyms-repository";
import { Decimal } from "@prisma/client/runtime/library";

let checkInsRepository: InMemoryCheckInsRepository;
let gymsRepository: InMemoryGymsRepository;
let checkInService: CheckInService;

describe("CheckIn Service", () => {
  beforeEach(() => {
    checkInsRepository = new InMemoryCheckInsRepository();
    gymsRepository = new InMemoryGymsRepository();
    checkInService = new CheckInService(checkInsRepository, gymsRepository);

    gymsRepository.items.push({
      id: "gym-1",
      title: "oxygym",
      description: "",
      phone: "",
      latitude: new Decimal(-24.2029194),
      longitude: new Decimal(-53.0351474),
    });

    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  test("should be able to check in", async () => {
    vi.setSystemTime(new Date(2023, 0, 10, 8, 0, 0));

    const { checkIn } = await checkInService.execute({
      gymId: "gym-1",
      userId: "user-1",
      userLatitude: -24.2029194,
      userLongitude: -53.0351474,
    });

    expect(checkIn.id).toEqual(expect.any(String));
  });

  test("should not be able checkin twice in the same day", async () => {
    vi.setSystemTime(new Date(2023, 0, 10, 8, 0, 0));

    await checkInService.execute({
      gymId: "gym-1",
      userId: "user-1",
      userLatitude: -24.2029194,
      userLongitude: -53.0351474,
    });

    await expect(
      checkInService.execute({
        gymId: "gym-1",
        userId: "user-1",
        userLatitude: -24.2029194,
        userLongitude: -53.0351474,
      })
    ).rejects.toBeInstanceOf(Error);
  });

  test("should be able checkin twice on the different day", async () => {
    vi.setSystemTime(new Date(2023, 0, 10, 11, 0, 0));

    await checkInService.execute({
      gymId: "gym-1",
      userId: "user-1",
      userLatitude: -24.2029194,
      userLongitude: -53.0351474,
    });

    vi.setSystemTime(new Date(2023, 0, 12, 11, 0, 0));

    const { checkIn } = await checkInService.execute({
      gymId: "gym-1",
      userId: "user-1",
      userLatitude: -24.2029194,
      userLongitude: -53.0351474,
    });

    expect(checkIn.id).toEqual(expect.any(String));
  });

  test("should not be able to check-in on distant gym", async () => {
    vi.setSystemTime(new Date(2023, 0, 10, 8, 0, 0));

    gymsRepository.items.push({
      id: "gym-2",
      title: "oxygym",
      description: "",
      phone: "",
      latitude: new Decimal(-24.1845826),
      longitude: new Decimal(-53.0275043),
    });

    await expect(() =>
      checkInService.execute({
        gymId: "gym-2",
        userId: "user-1",
        userLatitude: -24.2029194,
        userLongitude: -53.0351474,
      })
    ).rejects.toBeInstanceOf(Error);
  });
});
