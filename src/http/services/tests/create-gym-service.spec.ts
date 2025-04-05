/* eslint-disable @typescript-eslint/no-unused-vars */
import { InMemoryGymsRepository } from "@/http/repositories/in-memory/in-memory-gyms-repository";
import { beforeEach, describe, expect, it } from "vitest";
import { CreateGymService } from "../create-gym-service";

let gymsRepository: InMemoryGymsRepository;
let sut: CreateGymService;

describe("Create Gym Service", () => {
  beforeEach(() => {
    gymsRepository = new InMemoryGymsRepository();
    sut = new CreateGymService(gymsRepository);
  });

  it("should be able to create a gym", async () => {
    const { gym } = await sut.execute({
      title: "Typescript gym",
      description: null,
      phone: null,
      latitude: -23.5505,
      longitude: -46.6333,
    });

    expect(gym.id).toEqual(expect.any(String));
  });
});
