/* eslint-disable @typescript-eslint/no-unused-vars */
import { beforeEach, describe, expect, it, afterEach, vi } from "vitest";
import { InMemoryGymsRepository } from "@/http/repositories/in-memory/in-memory-gyms-repository";
import { SearchGymsService } from "../search-gyms-service";

let gymsRepository: InMemoryGymsRepository;
let sut: SearchGymsService;

describe("Search Gyms Service", () => {
  beforeEach(async () => {
    gymsRepository = new InMemoryGymsRepository();
    sut = new SearchGymsService(gymsRepository);
  });

  it("should be able to search for gyms", async () => {
    await gymsRepository.create({
      title: "Typescript Gym",
      description: null,
      phone: null,
      latitude: -23.5505,
      longitude: -46.6333,
    });

    await gymsRepository.create({
      title: "Javascript Gym",
      description: null,
      phone: null,
      latitude: -23.5505,
      longitude: -46.6333,
    });

    const { gyms } = await sut.execute({
      query: "Typescript",
      page: 1,
    });

    expect(gyms).toHaveLength(1);
    expect(gyms).toEqual([
      expect.objectContaining({
        title: "Typescript Gym",
      }),
    ]);
  });
  it("should be able to fetch paginated gyms search", async () => {
    for (let i = 1; i <= 22; i++) {
      await gymsRepository.create({
        title: `Javascript Gym ${i}`,
        description: null,
        phone: null,
        latitude: -23.5505,
        longitude: -46.6333,
      });
    }

    const { gyms } = await sut.execute({
      query: "Javascript",
      page: 2,
    });

    expect(gyms).toHaveLength(2);
    expect.objectContaining({
      title: "Javascript Gym 21",
    });
    expect.objectContaining({
      title: "Javascript Gym 22",
    });
  });
});
