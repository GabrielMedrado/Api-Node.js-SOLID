/* eslint-disable @typescript-eslint/no-unused-vars */
import { beforeEach, describe, expect, it } from "vitest";

import { compare } from "bcryptjs";
import { InMemoryUsersRepository } from "@/http/repositories/in-memory/in-memory-users-repository";
import { UserAlreadyExistsError } from "../errors/user-alredy-exists-error";
import { RegisterService } from "../register-service";

let usersRepository: InMemoryUsersRepository;
let sut: RegisterService;

describe("Register Service", () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    sut = new RegisterService(usersRepository);
  });
  it("should hash user password upon registration", async () => {
    const { user } = await sut.execute({
      name: "Gabriel Menino",
      email: "gabrielMenino@example.com",
      password: "123456",
    });

    const isPasswordCorrectHashed = await compare("123456", user.password_hash);

    expect(isPasswordCorrectHashed).toBe(true);
  });
  it("should not be able to register with same email twice", async () => {
    const email = "gabrielMenino@example.com";

    await sut.execute({
      name: "Gabriel Menino",
      email,
      password: "123456",
    });

    await expect(
      sut.execute({
        name: "Gabriel Menino",
        email,
        password: "123456",
      }),
    ).rejects.toBeInstanceOf(UserAlreadyExistsError);
  });
  it("should be able to register", async () => {
    const { user } = await sut.execute({
      name: "Gabriel Menino",
      email: "gabrielMenino@example.com",
      password: "123456",
    });

    expect(user.id).toEqual(expect.any(String));
  });
});
