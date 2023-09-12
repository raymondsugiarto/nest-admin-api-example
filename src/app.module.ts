import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { configService } from './config/config.service';
import { AuthController } from './auth/token.controller';
import { AuthService } from './auth/token.service';
import { User } from './entity/user.entity';
import { EmailExistsValidation } from './validator/email.validator';
import { UserService } from './auth/user.service';
import { UserController } from './auth/user.controller';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { jwtConstants } from './auth/constants';

@Module({
  imports: [
    TypeOrmModule.forRoot(configService.getTypeOrmConfig()),
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60s' },
    }),
  ],
  controllers: [AppController, AuthController, UserController],
  providers: [AppService, AuthService, UserService, EmailExistsValidation],
  exports: [UserService]
})
export class AppModule {}
