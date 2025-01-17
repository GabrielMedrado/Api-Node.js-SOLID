import { UsersRepository } from "@/http/repositories/prisma/prisma-users-repository";
import { RegisterService } from "../register-service";

export function MakeRegisterService() {
  const usersRepository = new UsersRepository();
  const registerService = new RegisterService(usersRepository);

  return registerService;
}
