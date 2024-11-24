import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  Param,
  Patch,
  Post,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Category } from './categories.model';
import { ValidationPipe } from 'src/pipes/validation/validation.pipe';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CategoryCreateDto } from './dto/category-create.dto';
import { CategoriesService } from './categories.service';
import { Roles } from 'src/auth/roles-auth.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { CategoryUpdateDto } from './dto/category-update.dto';

@Controller('categories')
export class CategoriesController {
  constructor(private categoriesService: CategoriesService) {}

  @ApiOperation({ summary: 'Получение всех категорий' })
  @ApiResponse({ status: 200, type: [Category] })
  @Roles('admin')
  @UseGuards(RolesGuard)
  @UsePipes(ValidationPipe)
  @Get()
  async getAll() {
    const result = await this.categoriesService.getAllCategories();

    if (result instanceof HttpException) {
      throw result;
    }

    return result;
  }

  @ApiOperation({ summary: 'Получение всех категорий, включая удаленные' })
  @ApiResponse({ status: 200, type: [Category] })
  @Roles('admin')
  @UseGuards(RolesGuard)
  @UsePipes(ValidationPipe)
  @Get('/dead-included')
  async getAllAndDead() {
    const result = await this.categoriesService.getAllAndDeadCategories();

    if (result instanceof HttpException) {
      throw result;
    }

    return result;
  }

  @ApiOperation({ summary: 'Получение категории по id' })
  @ApiResponse({ status: 200, type: Category })
  @UsePipes(ValidationPipe)
  @Roles('admin')
  @UseGuards(RolesGuard)
  @Get('/id/:id')
  async getById(@Param('id') id: number) {
    const result = await this.categoriesService.getCategoryById(id);

    if (result instanceof HttpException) {
      throw result;
    }

    return result;
  }

  @ApiOperation({ summary: 'Получение категорий пользователя по id' })
  @ApiResponse({ status: 200, type: Category })
  @UsePipes(ValidationPipe)
  @UseGuards(JwtAuthGuard)
  @Get('/user-id/:id')
  async getAllByUserId(@Param('id') id: string) {
    const result = await this.categoriesService.getAllCategoriesByUserId(id);

    if (result instanceof HttpException) {
      throw result;
    }

    return result;
  }

  @ApiOperation({ summary: 'Создание категории' })
  @ApiResponse({ status: 201, type: Category })
  @UseGuards(JwtAuthGuard)
  @UsePipes(ValidationPipe)
  @Post()
  async create(@Body() dto: CategoryCreateDto) {
    const result = await this.categoriesService.createCategory(dto);

    if (result instanceof HttpException) {
      throw result;
    }

    return result;
  }

  @ApiOperation({ summary: 'Изменение категории' })
  @ApiResponse({ status: 201, type: Category })
  @UseGuards(JwtAuthGuard)
  @UsePipes(ValidationPipe)
  @Patch('/id/:id')
  async patch(@Param('id') id: number, @Body() dto: CategoryUpdateDto) {
    const result = await this.categoriesService.changeCategory(id, dto);

    if (result instanceof HttpException) {
      throw result;
    }

    return result;
  }

  @ApiOperation({ summary: 'Удаление категории' })
  @ApiResponse({ status: 200, type: Category })
  @Roles('admin')
  @UseGuards(RolesGuard)
  @UsePipes(ValidationPipe)
  @Delete('/id/:id')
  async delete(@Param('id') id: number) {
    const result = await this.categoriesService.deleteCategory(id);

    if (result instanceof HttpException) {
      throw result;
    }

    return result;
  }
}
