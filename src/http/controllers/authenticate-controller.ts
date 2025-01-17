import { FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";
import { UsersRepository } from "../repositories/prisma/prisma-users-repository";
import { AuthenticateService } from "../services/authenticate-service";
import { InvalidCredentialsError } from "../services/errors/invalid-credentials-error";

export async function authenticate(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const authenticateBodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
  });

  const { email, password } = authenticateBodySchema.parse(request.body);

  try {
    const usersRepository = new UsersRepository();
    const authenticateService = new AuthenticateService(usersRepository);

    await authenticateService.execute({
      email,
      password,
    });
  } catch (error) {
    if (error instanceof InvalidCredentialsError) {
      return reply.status(400).send({ message: error.message });
    }

    throw error;
  }

  return reply.status(200).send();
}
