import z from "zod";
import { FastifyRequest, FastifyReply } from "fastify";
import { makeFetchUserCheckInsHistoryService } from "@/services/factories/make-fetch-user-check-ins-history-service";

export async function history(req: FastifyRequest, reply: FastifyReply) {
  const checkInHistoryQuerySchema = z.object({
    page: z.coerce.number().min(1).default(1),
  });

  const { page } = checkInHistoryQuerySchema.parse(req.query);

  const fetchUserCheckInsHistoryService = makeFetchUserCheckInsHistoryService();

  const { checkIns } = await fetchUserCheckInsHistoryService.execute({
    page,
    userId: req.user.sub,
  });

  return reply.status(201).send({
    checkIns,
  });
}
