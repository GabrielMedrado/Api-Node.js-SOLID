import { hash } from "bcryptjs";
import { IUsersRepository } from "../repositories/users-repository-interface";

interface registerUseCaseRequest {
  name: string;
  email: string;
  password: string; 
}  

export class RegisterUseCase {
  constructor(
    private usersRepository: IUsersRepository
  ) {}
  async execute ({
    name,
    email,
    password,
  }: registerUseCaseRequest) {
    const password_hash = await hash(password, 6);

    const userWithTheSameEmail = await this.usersRepository.findByEmail(email);
  
    if (userWithTheSameEmail) {
      throw new Error("E-mail already exists");
    }
  
    await this.usersRepository.create({ name, email, password_hash });
  }
}