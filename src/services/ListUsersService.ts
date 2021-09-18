import { classToPlain } from "class-transformer";
import { getCustomRepository } from "typeorm";
import { UserReporitory } from "../repositories/UserRepository";

class ListUsersService {
    async execute(){
        const userRepository = getCustomRepository(UserReporitory);

        const users = userRepository.find();

        return classToPlain(users);
    }
}

export { ListUsersService };
