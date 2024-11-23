import {
  forwardRef,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Category } from './categories.model';

import { UsersService } from 'src/users/users.service';
import cryptedError from 'src/utils/throwError';
import { CategoryCreateDto } from './dto/category-create.dto';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectModel(Category) private categoryRepository: typeof Category,
    @Inject(forwardRef(() => UsersService))
    private usersService: UsersService,
  ) {}

  async getAllCategories() {
    try {
      const categories = await this.categoryRepository.findAll({
        where: { deleted: false },
      });

      return categories;
    } catch (error) {
      return cryptedError(error);
    }
  }

  async getAllCategoriesByUserId(id: string) {
    try {
      const user = await this.usersService.getUserById(id);

      if (user instanceof HttpException) {
        return user as HttpException;
      }

      const categories = await this.categoryRepository.findAll({
        where: { deleted: false, userId: id },
      });

      return categories;
    } catch (error) {
      return cryptedError(error);
    }
  }

  async getAllAndDeadCategories() {
    try {
      const categories = await this.categoryRepository.findAll();

      return categories;
    } catch (error) {
      return cryptedError(error);
    }
  }

  async getCategoryById(id: string) {
    try {
      const category = await this.categoryRepository.findByPk(id);

      if (!category) {
        return new HttpException('Category not found.', HttpStatus.NOT_FOUND);
      }

      return category;
    } catch (error) {
      return cryptedError(error);
    }
  }

  async createCategory(dto: CategoryCreateDto) {
    try {
      const user = await this.usersService.getUserById(dto.userId);

      if (user instanceof HttpException) {
        return user as HttpException;
      }

      const category = await this.categoryRepository.create(dto);

      return category;
    } catch (error) {
      return cryptedError(error);
    }
  }

  async createDefaultCategories(userId: string) {
    try {
      const user = await this.usersService.getUserById(userId);

      if (user instanceof HttpException) {
        return user as HttpException;
      }

      await this.createCategory({
        userId,
        categoryName: 'Цели',
        categoryPriority: 'primary',
      });

      await this.createCategory({
        userId,
        categoryName: 'Обязательные траты',
        categoryPriority: 'primary',
      });

      await this.createCategory({
        userId,
        categoryName: 'Продукты',
        categoryPriority: 'secondary',
      });

      await this.createCategory({
        userId,
        categoryName: 'Здоровье',
        categoryPriority: 'secondary',
      });

      await this.createCategory({
        userId,
        categoryName: 'Семья',
        categoryPriority: 'secondary',
      });

      await this.createCategory({
        userId,
        categoryName: 'Транспорт',
        categoryPriority: 'secondary',
      });

      await this.createCategory({
        userId,
        categoryName: 'Покупки',
        categoryPriority: 'secondary',
      });

      await this.createCategory({
        userId,
        categoryName: 'Кафе',
        categoryPriority: 'other',
      });

      await this.createCategory({
        userId,
        categoryName: 'Досуг',
        categoryPriority: 'other',
      });
    } catch (error) {
      return cryptedError(error);
    }
  }

  async deleteCategory(id: string) {
    try {
      const category = await this.categoryRepository.findOne({ where: { id } });

      if (!category) {
        return new HttpException('Category not found', HttpStatus.NOT_FOUND);
      }

      if (category.deleted) {
        return new HttpException('Already deleted.', HttpStatus.GONE);
      } else {
        if (category.categoryPriority === 'primary') {
          return new HttpException(
            'Can not delete primary category.',
            HttpStatus.METHOD_NOT_ALLOWED,
          );
        } else {
          category.deleted = true;
          return await category.save();
        }
      }
    } catch (error) {
      return cryptedError(error);
    }
  }
}
