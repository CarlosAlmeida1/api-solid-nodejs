import { PrismaCheckInsRepository } from "@/repositories/prisma/prisma-check-ins-repository";
import { ValidateCheckInService } from "../validate-check-in";

export function makeValidateCheckInService() {
  const usersRepository = new PrismaCheckInsRepository();
  const service = new ValidateCheckInService(usersRepository);

  return service;
}
