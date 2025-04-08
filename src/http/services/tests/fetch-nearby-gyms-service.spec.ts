/* eslint-disable @typescript-eslint/no-unused-vars */
import { beforeEach, describe, expect, it, afterEach, vi } from "vitest";
import { InMemoryGymsRepository } from "@/http/repositories/in-memory/in-memory-gyms-repository";
import { FetchNearbyGymsService } from "../fetch-nearby-gyms-service";

let gymsRepository: InMemoryGymsRepository;
let sut: FetchNearbyGymsService;

describe("Fetch Nearby Gyms Service", () => {
  beforeEach(async () => {
    gymsRepository = new InMemoryGymsRepository();
    sut = new FetchNearbyGymsService(gymsRepository);
  });

  it("should be able to fetch nearby gyms", async () => {
    await gymsRepository.create({
      title: "Near Gym",
      description: null,
      phone: null,
      latitude: -23.5505,
      longitude: -46.6333,
    });

    await gymsRepository.create({
      title: "Far Gym",
      description: null,
      phone: null,
      latitude: -50.1052,
      longitude: -20.7777,
    });

    const { gyms } = await sut.execute({
      userLatitude: -23.5505,
      userLongitude: -46.6333,
    });

    expect(gyms).toHaveLength(1);
    expect(gyms).toEqual([
      expect.objectContaining({
        title: "Near Gym",
      }),
    ]);
  });
});
