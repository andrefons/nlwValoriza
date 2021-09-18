import { EntityRepository, Repository } from "typeorm";
import { User } from "../entities/User";

@EntityRepository(User)
class UserReporitory extends Repository<User>{

}

export {UserReporitory};