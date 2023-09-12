import { Body, Controller, Get, Post } from "@nestjs/common";
import { AuthService } from "./token.service";
import { TokenDto, TokenRequestDto } from "./token.dto";
import { Public } from "./public";

@Controller('tokens')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post()
  createToken(@Body() tokenRequestDto: TokenRequestDto): Promise<TokenDto> {
    return this.authService.createToken(tokenRequestDto);
  }

 


}