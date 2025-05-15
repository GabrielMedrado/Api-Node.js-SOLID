import { FastifyRequest, FastifyReply } from "fastify";
import { makeGetUserProfileService } from "../services/factories/make-get-user-profile-service";

export async function profileController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const getUerProfile = makeGetUserProfileService();

  const { user } = await getUerProfile.execute({
    userId: request.user.sub,
  });

  return reply.status(200).send({
    user: {
      ...user,
      password_hash: undefined,
    },
  });
}
