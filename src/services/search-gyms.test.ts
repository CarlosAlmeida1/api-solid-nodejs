import { expect, test, describe, beforeEach, vi } from "vitest";
import { InMemoryCheckInsRepository } from "@/repositories/in-memory/in-memory-check-ins-repository";
import { FetchUserCheckInsHistoryService } from "./fetch-user-check-ins-history";
import { InMemoryGymsRepository } from "@/repositories/in-memory/in-memory-gyms-repository";
import { SearchGymsService } from "./search-gyms";
import { title } from "process";

let gymsRepository: InMemoryGymsRepository;
let searchGymsService: SearchGymsService;

describe("Search Gyms Service", () => {
  beforeEach(async () => {
    gymsRepository = new InMemoryGymsRepository();
    searchGymsService = new SearchGymsService(gymsRepository);
  });

  test("should be able to search for gyms", async () => {
    await gymsRepository.create({
      title: "Aguas Claras",
      description: "",
      phone: null,
      latitude: -24.1850776,
      longitude: 53.0279882,
    });

    await gymsRepository.create({
      title: "Oxygym",
      description: "",
      phone: null,
      latitude: -24.1850776,
      longitude: 53.0279882,
    });

    const { gyms } = await searchGymsService.execute({
      query: "Oxygym",
      page: 1,
    });

    expect(gyms).toHaveLength(1);
    expect(gyms).toEqual([expect.objectContaining({ title: "Oxygym" })]);
  });

  test("should be able to fetch paginated gyms search", async () => {
    for (let i = 1; i <= 22; i++) {
      await gymsRepository.create({
        title: `Oxygym ${i}`,
        description: "",
        phone: null,
        latitude: -24.1850776,
        longitude: 53.0279882,
      });
    }

    const { gyms } = await searchGymsService.execute({
      query: "Oxygym",
      page: 2,
    });

    expect(gyms).toHaveLength(2);
    expect(gyms).toEqual([
      expect.objectContaining({ title: "Oxygym 21" }),
      expect.objectContaining({ title: "Oxygym 22" }),
    ]);
  });
});
