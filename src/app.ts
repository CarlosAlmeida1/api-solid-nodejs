import fastify from "fastify";
import { userRoutes } from "./http/controllers/users/routes";
import { ZodError } from "zod";
import { env } from "./env";
import fastifyJwt from "@fastify/jwt";
import { gymRoutes } from "./http/controllers/gyms/routes";
import { checkInRoutes } from "./http/controllers/check-ins/routes";

export const app = fastify();

app.register(userRoutes);
app.register(gymRoutes);
app.register(checkInRoutes);

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
});

app.setErrorHandler((error, _, reply) => {
  if (error instanceof ZodError) {
    return reply
      .status(400)
      .send({ message: "Validation error.", issues: error.format });
  }

  if (env.NODE_ENV != "production") {
    console.error(error);
  } else {
    // TODO ferramenta para observar os erros Datalog/NewRElic/Sentry
  }

  return reply.status(500).send({ message: "Internal Server Error" });
});
