/* eslint-disable @typescript-eslint/no-unused-vars */
import { describe, expect, it } from "vitest";
import { RegisterUseCase } from "./register-service";
import { compare } from "bcryptjs";
import { InMemoryUsersRepository } from "../repositories/in-memory/in-memory-users-repository";
import { UserAlreadyExistsError } from "./errors/user-alredy-exists-error";

describe("Register Use Case", () => {
  it("should hash user password upon registration", async () => {
    const usersRepository = new InMemoryUsersRepository();
    const registerUseCase = new RegisterUseCase(usersRepository);

    const { user } = await registerUseCase.execute({
      name: "Gabriel Menino",
      email: "gabrielMenino@example.com",
      password: "123456",
    });

    const isPasswordCorrectHashed = await compare("123456", user.password_hash);

    expect(isPasswordCorrectHashed).toBe(true);
  });
  it("should not be able to register with same email twice", async () => {
    const usersRepository = new InMemoryUsersRepository();
    const registerUseCase = new RegisterUseCase(usersRepository);

    const email = "gabrielMenino@example.com";

    await registerUseCase.execute({
      name: "Gabriel Menino",
      email,
      password: "123456",
    });

    await expect(
      registerUseCase.execute({
        name: "Gabriel Menino",
        email,
        password: "123456",
      }),
    ).rejects.toBeInstanceOf(UserAlreadyExistsError);
  });
  it("should be able to register", async () => {
    const usersRepository = new InMemoryUsersRepository();
    const registerUseCase = new RegisterUseCase(usersRepository);

    const { user } = await registerUseCase.execute({
      name: "Gabriel Menino",
      email: "gabrielMenino@example.com",
      password: "123456",
    });

    expect(user.id).toEqual(expect.any(String));
  });
});
