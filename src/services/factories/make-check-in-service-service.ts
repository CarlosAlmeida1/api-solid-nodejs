import { PrismaGymsRepository } from "@/repositories/prisma/prisma-gyms-repository";
import { CheckInService } from "../check-in";
import { PrismaCheckInsRepository } from "@/repositories/prisma/prisma-check-ins-repository";

export function makeCheckInService() {
  const usersRepository = new PrismaCheckInsRepository();
  const gymsRepository = new PrismaGymsRepository();
  const service = new CheckInService(usersRepository, gymsRepository);

  return service;
}
