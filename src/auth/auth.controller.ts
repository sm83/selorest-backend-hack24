import { Body, Controller, HttpException, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserCreateDto } from 'src/users/dto/user-create.dto';
import { AuthService } from './auth.service';
import { User } from 'src/users/users.model';
import { printManualLog } from 'src/utils/manualLog';

@ApiTags('Авторизация')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOperation({ summary: 'Авторизация пользователя' })
  @ApiResponse({ status: 201, type: User })
  @Post('/login')
  async login(@Body() dto: UserCreateDto) {
    const result = await this.authService.login(dto);

    if (result instanceof HttpException) {
      throw result;
    }

    printManualLog('result.token');
    console.log(result.token);

    return result;

    // will be uncommented for production.
    // response
    //   .status(200)
    //   .cookie('authToken', result.token, {
    //     signed: true,
    //     secure: false,
    //     maxAge: 604800000, // its miliseconds!
    //     httpOnly: true,
    //   })
    //   .json({ authToken: true, id: result.id })
    //   .send();
  }

  @ApiOperation({ summary: 'Регистрация пользователя' })
  @ApiResponse({ status: 201, type: User })
  @Post('/register')
  async register(@Body() dto: UserCreateDto) {
    const result = await this.authService.register(dto);
    if (result instanceof HttpException) {
      throw result;
    }

    return result;

    // will be uncommented for production.
    // response
    //   .status(201)
    //   .cookie('authToken', result.token, {
    //     signed: true,
    //     secure: false,
    //     maxAge: 604800000, // its miliseconds!
    //     httpOnly: true,
    //   })
    //   .json({ authToken: true, id: result.id })
    //   .send();
  }
}
