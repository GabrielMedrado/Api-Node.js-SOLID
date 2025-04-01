import { compare } from "bcryptjs";
import { IUsersRepository } from "../repositories/users-repository-interface";
import { InvalidCredentialsError } from "./errors/invalid-credentials-error";
import { User } from "@prisma/client";

interface IAuthenticateServiceRequest {
  email: string;
  password: string;
}

interface IAuthenticateServiceResponse {
  user: User;
}

export class AuthenticateService {
  constructor(private userRepository: IUsersRepository) {}

  async execute({
    email,
    password,
  }: IAuthenticateServiceRequest): Promise<IAuthenticateServiceResponse> {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new InvalidCredentialsError();
    }

    const doesPasswordMatches = await compare(password, user.password_hash);

    if (!doesPasswordMatches) {
      throw new InvalidCredentialsError();
    }

    return { user };
  }
}
