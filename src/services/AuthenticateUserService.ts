import { getCustomRepository } from "typeorm";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { UserReporitory } from "../repositories/UserRepository";

interface IAuthenticateRequest {
  email: string;
  password: string;
}

class AuthenticateUserService {
  async execute({ email, password }: IAuthenticateRequest) {
    const userRepository = getCustomRepository(UserReporitory);

    const user = await userRepository.findOne({ email });

    if (!user) throw new Error("Email/Password incorrect");

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) throw new Error("Email/Password incorrect");

    const token = sign(
      { email: user.email },
      "0ba673ad12186701a57773ec5558df1f99316547",
      {
        subject: user.id,
        expiresIn: "1d",
      }
    ); //sha1

    return token;
  }
}

export { AuthenticateUserService };
