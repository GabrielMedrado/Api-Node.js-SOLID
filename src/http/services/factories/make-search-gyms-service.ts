import { SearchGymsService } from "../search-gyms-service";
import { PrismaGymsRepository } from "@/http/repositories/prisma/prisma-gyms-repository";

export function makeSearchGymsService() {
  const gymsRepository = new PrismaGymsRepository();
  const service = new SearchGymsService(gymsRepository);

  return service;
}
