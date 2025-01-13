/* eslint-disable @typescript-eslint/no-unused-vars */
import { describe, expect, it } from "vitest";
import { RegisterUseCase } from "./register-service";
import { compare } from "bcryptjs";

describe("Register Use Case", () => {
  it("should hash user password upon registration", async () => {
    const registerUseCase = new RegisterUseCase({
      async findByEmail(email) {
        return null;
      },

      async create(data) {
        return {
          id: "user-1",
          name: data.name,
          email: data.email,
          password_hash: data.password_hash,
          created_at: new Date(),
        };
      },
    });

    const { user } = await registerUseCase.execute({
      name: "Gabriel Menino",
      email: "gabrielMenino@example.com",
      password: "123456",
    });

    const isPasswordCorrectHashed = await compare("123456", user.password_hash);

    expect(isPasswordCorrectHashed).toBe(true);
  });
});
