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
import { CurrenciesService } from './currencies.service';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Currency } from './currencies.model';
import { ValidationPipe } from 'src/pipes/validation/validation.pipe';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Roles } from 'src/auth/roles-auth.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { CurrencyCreateDto } from './dto/currency-create.dto';

@Controller('currencies')
export class CurrenciesController {
  constructor(private currenciesService: CurrenciesService) {}

  @ApiOperation({ summary: 'Получение всех валют' })
  @ApiResponse({ status: 200, type: Currency })
  @UseGuards(JwtAuthGuard)
  @UsePipes(ValidationPipe)
  @Get()
  async getAllAvaliable() {
    const result = await this.currenciesService.getAvaliableCurrencies();

    if (result instanceof HttpException) {
      throw result;
    }

    return result;
  }

  @ApiOperation({ summary: 'Получение всех валют, включая удаленные' })
  @ApiResponse({ status: 200, type: Currency })
  @Roles('admin')
  @UseGuards(RolesGuard)
  @UsePipes(ValidationPipe)
  @Get('/dead-included')
  async getAllAndDead() {
    const result = await this.currenciesService.getAllAndDeadCurrencies();

    if (result instanceof HttpException) {
      throw result;
    }

    return result;
  }

  @ApiOperation({ summary: 'Получение валюты по id' })
  @ApiResponse({ status: 200, type: Currency })
  @UsePipes(ValidationPipe)
  @UseGuards(JwtAuthGuard)
  @Get('/id/:id')
  async getById(@Param('id') id: string) {
    const result = await this.currenciesService.getCurrencyById(id);

    if (result instanceof HttpException) {
      throw result;
    }

    return result;
  }

  @ApiOperation({ summary: 'Создание валюты' })
  @ApiResponse({ status: 201, type: Currency })
  @Roles('admin')
  @UseGuards(RolesGuard)
  @UsePipes(ValidationPipe)
  @Post()
  async getAll(@Body() dto: CurrencyCreateDto) {
    const result = await this.currenciesService.createCurrency(dto);

    if (result instanceof HttpException) {
      throw result;
    }

    return result;
  }

  @ApiOperation({ summary: 'Удаление валюты' })
  @ApiResponse({ status: 200, type: Currency })
  @Roles('admin')
  @UseGuards(RolesGuard)
  @UsePipes(ValidationPipe)
  @Delete('/id/:id')
  async delete(@Param('id') id: string) {
    const result = await this.currenciesService.deleteCurrency(id);

    if (result instanceof HttpException) {
      throw result;
    }

    return result;
  }
}
