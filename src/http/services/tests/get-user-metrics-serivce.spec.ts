/* eslint-disable @typescript-eslint/no-unused-vars */
import { InMemoryCheckInsRepository } from "@/http/repositories/in-memory/in-memory-check-ins-repository";
import { beforeEach, describe, expect, it } from "vitest";
import { GetUserMetricsService } from "../get-user-metrics-serivce";

let checkInsRepository: InMemoryCheckInsRepository;
let sut: GetUserMetricsService;

describe("Get user metrics Service", () => {
  beforeEach(async () => {
    checkInsRepository = new InMemoryCheckInsRepository();
    sut = new GetUserMetricsService(checkInsRepository);
  });

  it("should be able to get check-ins count from metrics", async () => {
    await checkInsRepository.create({
      gym_id: "gym-01",
      user_id: "user-01",
    });

    await checkInsRepository.create({
      gym_id: "gym-02",
      user_id: "user-01",
    });

    const { checkInsCount } = await sut.execute({
      userId: "user-01",
    });

    expect(checkInsCount).toEqual(2);
  });
});
