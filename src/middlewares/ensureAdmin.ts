import { NextFunction, Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { UserReporitory } from "../repositories/UserRepository";

export async function ensureAdmin(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const { user_id } = request;

  const userRepository = getCustomRepository(UserReporitory);

  const user = await userRepository.findOne(user_id);

  if (user && user.admin) return next;

  return response.status(401).json({
    error: "Unauthorized",
  });
}