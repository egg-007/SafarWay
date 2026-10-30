import "reflect-metadata";
import { Container } from "inversify";
import { UserRepository } from "../modules/identity/repositories/user.repository.js";
import { AuthService } from "../modules/identity/services/auth.service.js";
import { AuthController } from "../modules/identity/controllers/auth.controller.js";
const container = new Container();
container.bind(AuthService).toSelf();
container.bind(UserRepository).toSelf();
container.bind(AuthController).toSelf();

export { container };