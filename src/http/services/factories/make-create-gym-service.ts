import { CreateGymService } from "../create-gym-service";
import { PrismaGymsRepository } from "@/http/repositories/prisma/prisma-gyms-repository";

export function makeCreateGymsService() {
  const gymsRepository = new PrismaGymsRepository();
  const service = new CreateGymService(gymsRepository);

  return service;
}
