import z from "zod";
import { FastifyRequest, FastifyReply } from "fastify";
import { makeCreateGymsService } from "@/services/factories/make-create-gym-service";

export async function create(req: FastifyRequest, reply: FastifyReply) {
  const createGymBodySchema = z.object({
    title: z.string(),
    description: z.string().nullable(),
    phone: z.string().nullable(),
    latitude: z.number().refine((value) => {
      return Math.abs(value) <= 90;
    }),
    longitude: z.number().refine((value) => {
      return Math.abs(value) <= 180;
    }),
  });

  const { title, description, latitude, longitude, phone } =
    createGymBodySchema.parse(req.body);

  const createGymService = makeCreateGymsService();

  await createGymService.execute({
    title,
    description,
    latitude,
    longitude,
    phone,
  });

  return reply.status(201).send();
}
