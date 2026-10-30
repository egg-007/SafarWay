import { inject, injectable } from "inversify";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { UserRepository } from "../repositories/user.repository.js";
import type { Iuser } from "../models/user.model.js";

@injectable()
export class AuthService {
  constructor(
    @inject(UserRepository)
    protected readonly userRepository: UserRepository,
  ) {}

  async create(data: Partial<Iuser>) {
    const hashedPassword = await bcrypt.hash(data.password!, 12);

    return this.userRepository.create({
      ...data,
      password: hashedPassword,
    });
  }

  async login(email: string, password: string) {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new Error("Invalid email or password");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new Error("Invalid email or password");
    }

    const secret = process.env.JWT_SECRET_KEY;

    if (!secret) {
      throw new Error("JWT_SECRET is not configured");
    }

    const token = jwt.sign(
      {
        sub: user._id.toString(),
        role: user.role,
      },
      secret,
      { expiresIn: "1h" },
    );

    const { password: _, ...safeUser } = user.toObject();

    return {
      user: safeUser,
      accessToken: token,
      tokenType: "Bearer",
      expiresIn: 3600,
    };
  }
}
