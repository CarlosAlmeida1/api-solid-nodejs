import { GetUserMetricsService } from "../get-user-metrics";
import { PrismaCheckInsRepository } from "@/repositories/prisma/prisma-check-ins-repository";

export function makeGetUserMetricsService() {
  const usersRepository = new PrismaCheckInsRepository();
  const service = new GetUserMetricsService(usersRepository);

  return service;
}
