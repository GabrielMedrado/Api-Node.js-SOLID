/* eslint-disable @typescript-eslint/no-unused-vars */
import { describe, expect, it } from "vitest";
import { RegisterService } from "./register-service";
import { compare } from "bcryptjs";
import { InMemoryUsersRepository } from "../repositories/in-memory/in-memory-users-repository";
import { UserAlreadyExistsError } from "./errors/user-alredy-exists-error";

describe("Register Service", () => {
  it("should hash user password upon registration", async () => {
    const usersRepository = new InMemoryUsersRepository();
    const registerService = new RegisterService(usersRepository);

    const { user } = await registerService.execute({
      name: "Gabriel Menino",
      email: "gabrielMenino@example.com",
      password: "123456",
    });

    const isPasswordCorrectHashed = await compare("123456", user.password_hash);

    expect(isPasswordCorrectHashed).toBe(true);
  });
  it("should not be able to register with same email twice", async () => {
    const usersRepository = new InMemoryUsersRepository();
    const registerService = new RegisterService(usersRepository);

    const email = "gabrielMenino@example.com";

    await registerService.execute({
      name: "Gabriel Menino",
      email,
      password: "123456",
    });

    await expect(
      registerService.execute({
        name: "Gabriel Menino",
        email,
        password: "123456",
      }),
    ).rejects.toBeInstanceOf(UserAlreadyExistsError);
  });
  it("should be able to register", async () => {
    const usersRepository = new InMemoryUsersRepository();
    const registerService = new RegisterService(usersRepository);

    const { user } = await registerService.execute({
      name: "Gabriel Menino",
      email: "gabrielMenino@example.com",
      password: "123456",
    });

    expect(user.id).toEqual(expect.any(String));
  });
});
