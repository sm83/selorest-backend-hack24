import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserLoginDto } from 'src/users/dto/user-login.dto';
import { UsersService } from 'src/users/users.service';
import * as bcryptjs from 'bcryptjs';
import { UserCreateDto } from 'src/users/dto/user-create.dto';
import { User } from 'src/users/users.model';
import cryptedError from 'src/utils/throwError';
import { ProfilesService } from 'src/profiles/profiles.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private profilesService: ProfilesService,
  ) {}

  // validation
  private async validateUser(userDto: UserLoginDto) {
    try {
      const user = await this.usersService.getUserByEmail(userDto.email);

      if (user instanceof HttpException) {
        return new UnauthorizedException({ message: 'Wrong authorization.' });
      }

      const passwordEquals = await bcryptjs.compare(
        userDto.password,
        user.password,
      );

      if (user && passwordEquals) {
        return user;
      } else {
        return new UnauthorizedException({ message: 'Wrong authorization.' });
      }
    } catch (error) {
      return cryptedError(error);
    }
  }

  //token generation
  private async generateToken(user: User) {
    try {
      const payload = { email: user.email, id: user.id, roles: user.roles };
      return this.jwtService.sign(payload, {
        privateKey: process.env.JWT_PRIVATE_KEY,
      });
    } catch (error) {
      return cryptedError(error);
    }
  }

  //login
  async login(
    userDto: UserLoginDto,
  ): Promise<{ token: string; id: string } | HttpException> {
    try {
      const user = await this.validateUser(userDto);

      if (user instanceof UnauthorizedException) {
        return user as UnauthorizedException;
      }
      if (user instanceof HttpException) {
        return user as HttpException;
      }

      const generatedToken = await this.generateToken(user);
      if (generatedToken instanceof HttpException) {
        return generatedToken as HttpException;
      }

      return { token: generatedToken, id: user.id };
    } catch (error) {
      return cryptedError(error);
    }
  }

  //register
  async register(
    userDto: UserCreateDto,
  ): Promise<{ token: string; id: string } | HttpException> {
    try {
      const candidate = await this.usersService.getUserByEmail(userDto.email);
      if (candidate instanceof User) {
        return new HttpException(
          'User with this email already exists.',
          HttpStatus.CONFLICT,
        );
      } else if (
        candidate instanceof HttpException &&
        candidate.getStatus() === 404
      ) {
        const user = await this.usersService.createUser({
          ...userDto,
        });

        if (user instanceof HttpException) {
          return user as HttpException;
        }

        const generatedToken = await this.generateToken(user);
        if (generatedToken instanceof HttpException) {
          return generatedToken as HttpException;
        }

        return { token: generatedToken, id: user.id };
      }
    } catch (error) {
      return cryptedError(error);
    }
  }
}
