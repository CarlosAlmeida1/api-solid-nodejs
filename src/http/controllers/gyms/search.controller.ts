import z from "zod";
import { FastifyRequest, FastifyReply } from "fastify";
import { makeSearchGymsService } from "@/services/factories/make-search-gyms-service";

export async function search(req: FastifyRequest, reply: FastifyReply) {
  const searchGymsQuerySchema = z.object({
    q: z.string(),
    page: z.coerce.number().min(1).default(1),
  });

  const { page, q } = searchGymsQuerySchema.parse(req.query);

  const searchGymService = makeSearchGymsService();

  const { gyms } = await searchGymService.execute({
    page,
    query: q,
  });

  return reply.status(201).send({
    gyms,
  });
}
