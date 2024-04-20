import z from "zod";
import { RegisterService } from "@/services/register";
import { FastifyRequest, FastifyReply } from "fastify";
import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository";
import { UserAlreadyExistsError } from "@/services/errors/user-already-exists-error";

export async function register(req: FastifyRequest, reply: FastifyReply) {
  const registerUserBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
  });

  const { name, email, password } = registerUserBodySchema.parse(req.body);

  try {
    const prismaUsersRepository = new PrismaUsersRepository();
    const registerService = new RegisterService(prismaUsersRepository);

    await registerService.execute({
      name,
      email,
      password,
    });
  } catch (error) {
    if (error instanceof UserAlreadyExistsError) {
      return reply.status(409).send({ message: error.message });
    }

    throw error;
  }

  return reply.status(201).send();
}
