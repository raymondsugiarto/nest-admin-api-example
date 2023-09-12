import { IsNotEmpty, IsString } from "class-validator";
import { User } from "src/entity/user.entity";
import { IsEmailExists } from "../validator/email.validator";
import { IsUsernameExists } from "src/validator/username.validator";

export class UserDto implements Readonly<UserDto> {
    
    id: number;

    @IsNotEmpty()
    @IsString()
    @IsEmailExists()
    email: string;

    @IsNotEmpty()
    @IsString()
    @IsUsernameExists()
    username: string;

    @IsNotEmpty()
    @IsString()
    fullname: string;

    photo: string;

    @IsNotEmpty()
    @IsString()
    password: string;

    public toEntity() {
        const it = new User();
        it.username = this.username;
        it.fullname = this.fullname;
        it.email = this.email;
        it.password = this.password;
        it.photo = this.photo;
        return it;
    }
}