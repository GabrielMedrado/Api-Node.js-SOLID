import { FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";
import { makeFetchUserCheckInsHistoryService } from "@/http/services/factories/make-fetch-user-check-ins-history-service";

export async function historyGymController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const checkInHistoryQuerySchema = z.object({
    page: z.coerce.number().min(1).default(1),
  });

  const { page } = checkInHistoryQuerySchema.parse(request.query);

  const fetchUserCheckinHistoryService = makeFetchUserCheckInsHistoryService();

  const { checkIns } = await fetchUserCheckinHistoryService.execute({
    userId: request.user.sub,
    page,
  });

  return reply.status(200).send({
    checkIns,
  });
}
