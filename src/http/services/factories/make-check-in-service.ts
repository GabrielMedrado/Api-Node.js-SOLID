import { PrismaCheckInsRepository } from "@/http/repositories/prisma/prisma-check-ins-repository";
import { CheckInService } from "../check-in-service";
import { PrismaGymsRepository } from "@/http/repositories/prisma/prisma-gyms-repository";

export function makeCheckInService() {
  const checkInsRepository = new PrismaCheckInsRepository();
  const gymsRepository = new PrismaGymsRepository();
  const service = new CheckInService(checkInsRepository, gymsRepository);

  return service;
}
