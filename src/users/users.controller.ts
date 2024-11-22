import {
  Body,
  Controller,
  Get,
  HttpException,
  Param,
  Post,
  Delete,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { UserCreateDto } from './dto/user-create.dto';
import { UsersService } from './users.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from './users.model';
import { UserAddRoleDto } from './dto/user-addRole.dto';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/roles-auth.decorator';
import { ValidationPipe } from 'src/pipes/validation/validation.pipe';

@ApiTags('Пользователи')
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @ApiOperation({ summary: 'Создание пользователя' })
  @ApiResponse({ status: 201, type: User })
  @UsePipes(ValidationPipe)
  @Roles('admin')
  @UseGuards(RolesGuard)
  @Post()
  async create(@Body() dto: UserCreateDto) {
    const result = await this.usersService.createUser(dto);

    if (result instanceof HttpException) {
      throw result;
    }

    return result;
  }

  @ApiOperation({ summary: 'Получение списка всех пользователей' })
  @ApiResponse({ status: 200, type: [User] })
  @UsePipes(ValidationPipe)
  @Roles('admin')
  @UseGuards(RolesGuard)
  @Get()
  async getAll() {
    const result = await this.usersService.getAllUsers();

    if (result instanceof HttpException) {
      // imposible to go here, getAllUsers() always return result, at least [].
      throw result;
    }

    return result;
  }

  @ApiOperation({ summary: 'Получение пользователя по id' })
  @ApiResponse({ status: 200, type: [User] })
  @UsePipes(ValidationPipe)
  @Roles('admin')
  @UseGuards(RolesGuard)
  @Get('/id/:id')
  async getById(@Param('id') id: string) {
    const result = await this.usersService.getUserById(id);

    if (result instanceof HttpException) {
      throw result;
    }

    return result;
  }

  @ApiOperation({ summary: 'Получение пользователя по email' })
  @ApiResponse({ status: 200, type: [User] })
  @UsePipes(ValidationPipe)
  @Roles('admin')
  @UseGuards(RolesGuard)
  @Get('/email/:email')
  async getByEmail(@Param('email') email: string) {
    const result = await this.usersService.getUserByEmail(email);

    if (result instanceof HttpException) {
      throw result;
    }

    return result;
  }

  @ApiOperation({ summary: 'Выдать роль' })
  @ApiResponse({ status: 201 })
  @UsePipes(ValidationPipe)
  @Roles('admin')
  @UseGuards(RolesGuard)
  @Post('/role')
  async addRole(@Body() dto: UserAddRoleDto) {
    const result = await this.usersService.addRole(dto);

    if (result instanceof HttpException) {
      throw result;
    }

    return result;
  }

  @ApiOperation({ summary: 'Забрать роль' })
  @ApiResponse({ status: 201 })
  @UsePipes(ValidationPipe)
  @Roles('admin')
  @UseGuards(RolesGuard)
  @Delete('/role')
  async removeRole(@Body() dto: UserAddRoleDto) {
    const result = await this.usersService.removeRole(dto);

    if (result instanceof HttpException) {
      throw result;
    }

    return result;
  }
}
