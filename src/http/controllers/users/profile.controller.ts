import { makeGetUserProfileService } from "@/services/factories/make-get-user-profile-service";
import { FastifyReply, FastifyRequest } from "fastify";

export async function profile(req: FastifyRequest, reply: FastifyReply) {
  const getUserProfileService = makeGetUserProfileService();

  const { user } = await getUserProfileService.execute({
    userId: req.user.sub,
  });

  return reply.status(200).send({
    user: {
      ...user,
      password_hash: undefined,
    },
  });
}
