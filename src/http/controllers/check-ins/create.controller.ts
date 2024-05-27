import z from "zod";
import { FastifyRequest, FastifyReply } from "fastify";
import { makeCheckInService } from "@/services/factories/make-check-in-service-service";

export async function create(req: FastifyRequest, reply: FastifyReply) {
  const createCheckInParamsSchema = z.object({
    gymId: z.string().uuid(),
  });

  const createCheckInBodySchema = z.object({
    latitude: z.coerce.number().refine((value) => {
      return Math.abs(value) <= 90;
    }),
    longitude: z.coerce.number().refine((value) => {
      return Math.abs(value) <= 180;
    }),
  });

  const { latitude, longitude } = createCheckInBodySchema.parse(req.body);
  const { gymId } = createCheckInParamsSchema.parse(req.params);

  const checkInService = makeCheckInService();

  await checkInService.execute({
    userLatitude: latitude,
    userLongitude: longitude,
    gymId,
    userId: req.user.sub,
  });

  return reply.status(201).send();
}
