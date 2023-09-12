import { Transform, Type } from "class-transformer";
import { IsNotEmpty, IsString } from "class-validator";

export class TokenRequestDto implements Readonly<TokenRequestDto> {
    
    @IsNotEmpty()
    @IsString()
    username: string;

    @IsNotEmpty()
    @IsString()
    password: string;
}

export class TokenDto implements Readonly<TokenDto> {
    accessToken: string;
}