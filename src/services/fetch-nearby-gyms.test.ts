import { expect, test, describe, beforeEach, vi } from "vitest";
import { InMemoryGymsRepository } from "@/repositories/in-memory/in-memory-gyms-repository";
import { SearchGymsService } from "./search-gyms";
import { FetchNearbyGymsService } from "./fetch-nearby-gyms";

let gymsRepository: InMemoryGymsRepository;
let fetchNearbyGymsService: FetchNearbyGymsService;

describe("Fetch Nearby Gyms Service", () => {
  beforeEach(async () => {
    gymsRepository = new InMemoryGymsRepository();
    fetchNearbyGymsService = new FetchNearbyGymsService(gymsRepository);
  });

  test("should be able to fetch nearby gyms ", async () => {
    await gymsRepository.create({
      title: "ACADEMIA PROXIMA",
      description: "",
      phone: null,
      latitude: -27.2092052,
      longitude: -49.6401091,
    });

    await gymsRepository.create({
      title: "ACADEMIA LONGE",
      description: "",
      phone: null,
      latitude: -27.0610928,
      longitude: -49.5229501,
    });

    const { gyms } = await fetchNearbyGymsService.execute({
      userLatitude: -27.2092052,
      userLongitude: -49.6401091,
    });

    expect(gyms).toHaveLength(1);
    expect(gyms).toEqual([
      expect.objectContaining({ title: "ACADEMIA PROXIMA" }),
    ]);
  });
});
