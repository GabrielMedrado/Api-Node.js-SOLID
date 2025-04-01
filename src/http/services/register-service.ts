import { hash } from "bcryptjs";
import { IUsersRepository } from "../repositories/users-repository-interface";
import { UserAlreadyExistsError } from "./errors/user-alredy-exists-error";
import { User } from "@prisma/client";

interface IRegisterServiceRequest {
  name: string;
  email: string;
  password: string;
}

interface IRegisterServiceResponse {
  user: User;
}

export class RegisterService {
  constructor(private usersRepository: IUsersRepository) {}
  async execute({
    name,
    email,
    password,
  }: IRegisterServiceRequest): Promise<IRegisterServiceResponse> {
    const password_hash = await hash(password, 6);

    const userWithTheSameEmail = await this.usersRepository.findByEmail(email);

    if (userWithTheSameEmail) {
      throw new UserAlreadyExistsError();
    }

    const user = await this.usersRepository.create({
      name,
      email,
      password_hash,
    });

    return {
      user,
    };
  }
}
