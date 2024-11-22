import {
  Controller,
  Get,
  Req,
  UnauthorizedException,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Request } from 'express';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ValidationPipe } from 'src/pipes/validation/validation.pipe';
import { printManualLog } from 'src/utils/manualLog';

@Controller('tests')
export class TestsController {
  @ApiOperation({ summary: 'Тестирование авторизации по токену' })
  @ApiResponse({ status: 200 })
  @UsePipes(ValidationPipe)
  @UseGuards(JwtAuthGuard)
  @Get('/testAuth')
  async testAuth() {
    const result = { message: 'very nice!' };

    return result;
  }

  @ApiOperation({ summary: 'Тестирование авторизации по токену' })
  @ApiResponse({ status: 200 })
  @UsePipes(ValidationPipe)
  @Get('/testCookie')
  async testCookie(@Req() request: Request) {
    const result = { message: 'cookie?' };

    printManualLog('authToken cookie:');
    console.log(request.signedCookies['authToken']);

    return result;
  }

  @ApiOperation({ summary: 'Получение статуса неавторизованности' })
  @ApiResponse({ status: 200 })
  @UsePipes(ValidationPipe)
  @Get('/get401')
  async getNotAuthorized() {
    const result = new UnauthorizedException();

    throw result;
  }
}
