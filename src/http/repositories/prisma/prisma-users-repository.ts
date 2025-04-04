import { prisma } from "@/lib/prisma";
import { Prisma, User } from "@prisma/client";
import { IUsersRepository } from "../users-repository-interface";

export class UsersRepository implements IUsersRepository {
  async create(data: Prisma.UserCreateInput) {
    const user = await prisma.user.create({ data });

    return user;
  }

  async findByEmail(email: string) {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    return user;
  }

  findById(id: string): Promise<User | null> {
    throw new Error("Method not implemented.");
  }
}
