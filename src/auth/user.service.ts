import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/entity/user.entity";
import { Repository } from "typeorm";
import { UserDto } from "./user.dto";

@Injectable()
export class UserService {

    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>
    ) { }

    public async findUserByUsername(username: string): Promise<User> {
        return this.userRepository.findOneBy({ username })
    }

    public async findUserByEmail(email: string): Promise<User> {
        return this.userRepository.findOneBy({ email })
    }

    async createUser(userDto: UserDto): Promise<User> {
        return this.userRepository.save(userDto.toEntity());
    }
}