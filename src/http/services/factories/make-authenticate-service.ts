import { UsersRepository } from "@/http/repositories/prisma/prisma-users-repository";
import { AuthenticateService } from "../authenticate-service";

export function MakeAuthenticateService() {
  const usersRepository = new UsersRepository();
  const authenticateService = new AuthenticateService(usersRepository);

  return authenticateService;
}
