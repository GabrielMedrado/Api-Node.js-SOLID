import { UsersRepository } from "@/http/repositories/prisma/prisma-users-repository";
import { GetUserProfileService } from "../get-user-profile-service";

export function makeGetUserProfileService() {
  const usersRepository = new UsersRepository();
  const service = new GetUserProfileService(usersRepository);

  return service;
}
