import { Body, Controller, Get, Post } from "@nestjs/common";
import { UserService } from "./user.service";
import { User } from "src/entity/user.entity";
import { UserDto } from "./user.dto";

@Controller('users')
export class UserController {

    constructor(private readonly authService: UserService) {}

    @Post()
    public async createUser(@Body() userDto: UserDto): Promise<UserDto> {
      return this.authService.createUser(userDto).then(user => this.fromEntity(user));
    }

    public fromEntity(user: User) {
        const it = new UserDto();
        it.id = user.id;
        it.email = user.email;
        it.username = user.username;
        it.fullname = user.fullname;
        it.password = user.password;
        it.photo = user.photo;
        return it;
    }
}