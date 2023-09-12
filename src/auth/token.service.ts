import { Injectable, UnauthorizedException, UnprocessableEntityException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/entity/user.entity";
import { Repository } from "typeorm";
import { TokenDto, TokenRequestDto } from "./token.dto";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService {

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  getHello(): string {
    return 'Hello World!';
  }

  public async findUserByEmail(email: string): Promise<User> {
    return this.userRepository.findOneBy({ email })
  }

  async createToken(tokenRequestDto: TokenRequestDto): Promise<any> {
    var user = await this.userRepository.findOneBy(tokenRequestDto);
    if (user) {
      const payload = { sub: user.id, username: user.username };

      var tokenDto = new TokenDto();
      tokenDto.accessToken = await this.jwtService.signAsync(payload);
      return tokenDto;
    } else {
      throw new UnauthorizedException("username password wrong")
    }
  }
}
