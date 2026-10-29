import { inject, injectable } from "inversify";
import { UserRepository } from "../repositories/user.repository.js";
import type { Iuser } from "../models/user.model.js";

@injectable()
export class AuthService {
  constructor(
    @inject(UserRepository)
    protected readonly userRepository: UserRepository,
  ) {}
  async create  (data:Partial<Iuser>){
    return await this.userRepository.create(data)
  }
}
