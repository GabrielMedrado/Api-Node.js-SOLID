/* eslint-disable @typescript-eslint/no-unused-vars */
import { beforeEach, describe, expect, it, afterEach, vi } from "vitest";
import { InMemoryCheckInsRepository } from "../repositories/in-memory/in-memory-check-ins-repository";
import { CheckInService } from "./check-in-service";
import { InMemoryGymsRepository } from "../repositories/in-memory/in-memory-gyms-repository";
import { Decimal } from "@prisma/client/runtime/library";

let checkInsRepository: InMemoryCheckInsRepository;
let gymRepository: InMemoryGymsRepository;
let sut: CheckInService;

describe("Check-in Service", () => {
  beforeEach(() => {
    checkInsRepository = new InMemoryCheckInsRepository();
    gymRepository = new InMemoryGymsRepository();
    sut = new CheckInService(checkInsRepository, gymRepository);

    gymRepository.items.push({
      id: "gym-01",
      title: "JavaScript Gym",
      description: "The best gym for JavaScript developers",
      phone: "",
      latitude: new Decimal(-23.494614),
      longitude: new Decimal(-46.447486),
    });

    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });
  it("should be able to check in", async () => {
    const { checkIn } = await sut.execute({
      gymId: "gym-01",
      userId: "user-01",
      userLatitude: -23.494614,
      userLongitude: -46.447486,
    });

    expect(checkIn.id).toEqual(expect.any(String));
  });
  it("should not be able to check in twice in the same day", async () => {
    await sut.execute({
      gymId: "gym-01",
      userId: "user-01",
      userLatitude: -23.494614,
      userLongitude: -46.447486,
    });

    await expect(() =>
      sut.execute({
        gymId: "gym-01",
        userId: "user-01",
        userLatitude: -23.494614,
        userLongitude: -46.447486,
      }),
    ).rejects.toBeInstanceOf(Error);
  });
  it("should be able to check in twice but in different days", async () => {
    vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0));

    await sut.execute({
      gymId: "gym-01",
      userId: "user-01",
      userLatitude: -23.494614,
      userLongitude: -46.447486,
    });

    vi.setSystemTime(new Date(2022, 0, 21, 8, 0, 0));

    const { checkIn } = await sut.execute({
      gymId: "gym-01",
      userId: "user-01",
      userLatitude: -23.494614,
      userLongitude: -46.447486,
    });

    expect(checkIn.id).toEqual(expect.any(String));
  });

  it("should not be able to check in on distant gym", async () => {
    gymRepository.items.push({
      id: "gym-02",
      title: "JavaScript Gym",
      description: "The best gym for JavaScript developers",
      phone: "",
      latitude: new Decimal(-23.494614),
      longitude: new Decimal(-46.447486),
    });

    await expect(() =>
      sut.execute({
        gymId: "gym-02",
        userId: "user-01",
        userLatitude: -23.5425136,
        userLongitude: -46.4324399,
      }),
    ).rejects.toBeInstanceOf(Error);
  });
});
