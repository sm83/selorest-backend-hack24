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
import { TransactionsService } from './transactions.service';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ValidationPipe } from 'src/pipes/validation/validation.pipe';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Transaction } from './transactions.model';
import { TransactionCreateDto } from './dto/transaction-create.dto';
import { Roles } from 'src/auth/roles-auth.decorator';
import { RolesGuard } from 'src/auth/roles.guard';

@Controller('transactions')
export class TransactionsController {
  constructor(private transactionsService: TransactionsService) {}

  @ApiOperation({ summary: 'Получение всех транзакций' })
  @ApiResponse({ status: 200, type: [Transaction] })
  @Roles('admin')
  @UseGuards(RolesGuard)
  @UsePipes(ValidationPipe)
  @Get()
  async getAll() {
    const result = await this.transactionsService.getAllTransactions();

    if (result instanceof HttpException) {
      throw result;
    }

    return result;
  }

  @ApiOperation({ summary: 'Получение всех транзакций, включая удаленные' })
  @ApiResponse({ status: 200, type: [Transaction] })
  @Roles('admin')
  @UseGuards(RolesGuard)
  @UsePipes(ValidationPipe)
  @Get('/dead-included')
  async getAllAndDead() {
    const result = await this.transactionsService.getAllAndDeadTransactions();

    if (result instanceof HttpException) {
      throw result;
    }

    return result;
  }

  @ApiOperation({ summary: 'Получение транзакции по id' })
  @ApiResponse({ status: 200, type: Transaction })
  @UsePipes(ValidationPipe)
  @Roles('admin')
  @UseGuards(RolesGuard)
  @Get('/id/:id')
  async getById(@Param('id') id: string) {
    const result = await this.transactionsService.getTransactionById(id);

    if (result instanceof HttpException) {
      throw result;
    }

    return result;
  }

  // TODO: транзакции по пользователю.

  @ApiOperation({ summary: 'Создание категории' })
  @ApiResponse({ status: 201, type: Transaction })
  @UseGuards(JwtAuthGuard)
  @UsePipes(ValidationPipe)
  @Post()
  async create(@Body() dto: TransactionCreateDto) {
    const result = await this.transactionsService.createTransaction(dto);

    if (result instanceof HttpException) {
      throw result;
    }

    return result;
  }

  @ApiOperation({ summary: 'Удаление категории' })
  @ApiResponse({ status: 200, type: Transaction })
  @Roles('admin')
  @UseGuards(RolesGuard)
  @UsePipes(ValidationPipe)
  @Delete('/id/:id')
  async delete(@Param('id') id: string) {
    const result = await this.transactionsService.deleteTransaction(id);

    if (result instanceof HttpException) {
      throw result;
    }

    return result;
  }
}
