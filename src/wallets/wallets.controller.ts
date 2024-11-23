import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  Param,
  Post,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ValidationPipe } from 'src/pipes/validation/validation.pipe';
import { Wallet } from './wallets.model';
import { WalletCreateDto } from './dto/wallet-create.dto';
import { WalletsService } from './wallets.service';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/roles-auth.decorator';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('wallets')
export class WalletsController {
  constructor(private walletsService: WalletsService) {}

  @ApiOperation({ summary: 'Получение всех счетов пользователя' })
  @ApiResponse({ status: 200, type: Wallet })
  @UseGuards(JwtAuthGuard)
  @Get('/user-id/:id')
  async getAllByUser(@Param('id') id: string) {
    const result = await this.walletsService.getWalletsByUserId(id);

    if (result instanceof HttpException) {
      throw result;
    }

    return result;
  }

  @ApiOperation({ summary: 'Получение всех счетов' })
  @ApiResponse({ status: 200, type: Wallet })
  @Roles('admin')
  @UseGuards(RolesGuard)
  @UsePipes(ValidationPipe)
  @Get()
  async getAll() {
    const result = await this.walletsService.getAllWallets();

    if (result instanceof HttpException) {
      throw result;
    }

    return result;
  }

  @ApiOperation({ summary: 'Получение всех счетов, включая удаленные' })
  @ApiResponse({ status: 200, type: Wallet })
  @Roles('admin')
  @UseGuards(RolesGuard)
  @UsePipes(ValidationPipe)
  @Get('/dead-included')
  async getAllAndDead() {
    const result = await this.walletsService.getAllAndDeadWallets();

    if (result instanceof HttpException) {
      throw result;
    }

    return result;
  }

  @ApiOperation({ summary: 'Получение счет по id' })
  @ApiResponse({ status: 200, type: Wallet })
  @UsePipes(ValidationPipe)
  @Roles('admin')
  @UseGuards(RolesGuard)
  @Get('/id/:id')
  async getById(@Param('id') id: string) {
    const result = await this.walletsService.getWalletById(id);

    if (result instanceof HttpException) {
      throw result;
    }

    return result;
  }

  @ApiOperation({ summary: 'Создание счета' })
  @ApiResponse({ status: 201, type: Wallet })
  @Roles('admin')
  @UseGuards(RolesGuard)
  @UsePipes(ValidationPipe)
  @Post()
  async create(@Body() dto: WalletCreateDto) {
    const result = await this.walletsService.createWallet(dto);

    if (result instanceof HttpException) {
      throw result;
    }

    return result;
  }

  @ApiOperation({ summary: 'Удаление счета' })
  @ApiResponse({ status: 200, type: Wallet })
  @Roles('admin')
  @UseGuards(RolesGuard)
  @UsePipes(ValidationPipe)
  @Delete('/id/:id')
  async delete(@Param('id') id: string) {
    const result = await this.walletsService.deleteWallet(id);

    if (result instanceof HttpException) {
      throw result;
    }

    return result;
  }
}
