import { FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";
import { makeSearchGymsService } from "@/http/services/factories/make-search-gyms-service";

export async function searchGymController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const searchGymQuerySchema = z.object({
    query: z.string().min(2).max(100),
    page: z.coerce.number().min(1).default(1),
  });

  const { query, page } = searchGymQuerySchema.parse(request.query);

  const searchGymsService = makeSearchGymsService();

  const { gyms } = await searchGymsService.execute({
    query,
    page,
  });

  return reply.status(200).send({
    gyms,
  });
}
