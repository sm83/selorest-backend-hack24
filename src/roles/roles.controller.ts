import {
  Body,
  Controller,
  Get,
  HttpException,
  Param,
  Post,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/role-create.dto';
import { Role } from './roles.model';
import { Roles } from 'src/auth/roles-auth.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { ValidationPipe } from 'src/pipes/validation/validation.pipe';

@ApiTags('Роли')
@Controller('roles')
export class RolesController {
  constructor(private rolesService: RolesService) {}

  @ApiOperation({ summary: 'Получение списка всех ролей' })
  @ApiResponse({ status: 200, type: [Role] })
  @UsePipes(ValidationPipe)
  @Roles('admin')
  @UseGuards(RolesGuard)
  @Get()
  async getAll() {
    const result = await this.rolesService.getAllRoles();

    if (result instanceof HttpException) {
      throw result;
    }

    return result;
  }

  @ApiOperation({ summary: 'Получение роли' })
  @ApiResponse({ status: 200, type: Role })
  @UsePipes(ValidationPipe)
  @Roles('admin')
  @UseGuards(RolesGuard)
  @Get('/:roleName')
  async getByValue(@Param('roleName') value: string) {
    const result = await this.rolesService.getRoleByValue(value);

    if (result instanceof HttpException) {
      throw result;
    }

    return result;
  }

  @ApiOperation({ summary: 'Создание роли' })
  @ApiResponse({ status: 201, type: Role })
  @UsePipes(ValidationPipe)
  @Roles('admin')
  @UseGuards(RolesGuard)
  @Post()
  async create(@Body() roleDto: CreateRoleDto) {
    const result = await this.rolesService.createRole(roleDto);

    if (result instanceof HttpException) {
      throw result;
    }

    return result;
  }
}
