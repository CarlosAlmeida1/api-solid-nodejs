import { UsersRepository } from "@/repositories/users-repository";
import { InvalidCredentialsError } from "./errors/invalid-credentials-error";
import { compare } from "bcryptjs";
import { User } from "@prisma/client";

interface AuthenticateServiceRequest {
  email: string;
  password: string;
}

interface AuthenticateServiceResponse {
  user: User;
}

export class AuthenticateService {
  constructor(private userRepository: UsersRepository) {}

  async execute({
    email,
    password,
  }: AuthenticateServiceRequest): Promise<AuthenticateServiceResponse> {
    const user = await this.userRepository.findByEmail(email);

    if (!user) throw new InvalidCredentialsError();

    // boolean => "is", "has", "does"

    const isPasswordMatches = await compare(password, user.password_hash);

    if (!isPasswordMatches) throw new InvalidCredentialsError();

    return {
      user,
    };
  }
}
