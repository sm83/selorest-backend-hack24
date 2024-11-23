import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User } from './users.model';
import { InjectModel } from '@nestjs/sequelize';
import { UserCreateDto } from './dto/user-create.dto';
import * as bcryptjs from 'bcryptjs';
import { RolesService } from 'src/roles/roles.service';
import { UserAddRoleDto } from './dto/user-addRole.dto';
import cryptedError from 'src/utils/throwError';
import { ProfilesService } from 'src/profiles/profiles.service';
import { CategoriesService } from 'src/categories/categories.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User) private userRepository: typeof User,
    private roleService: RolesService,
    private profilesService: ProfilesService,
    private categoriesService: CategoriesService,
  ) {}

  // creating admin user
  async createAdminUser(dto: UserCreateDto): Promise<User | HttpException> {
    try {
      const hashPassword = await bcryptjs.hash(dto.password, 5);

      const adminUser = await this.userRepository.create({
        ...dto,
        password: hashPassword,
      });

      const role = await this.roleService.getRoleByValue('admin');
      if (role instanceof HttpException) {
        return role;
      }

      await adminUser.$set('roles', [role.id]);
      adminUser.roles = [role];

      const profile = this.profilesService.createProfile(adminUser.id);
      if (profile instanceof HttpException) {
        return profile as HttpException;
      }

      await this.categoriesService.createDefaultCategories(adminUser.id);

      return adminUser;
    } catch (error) {
      return cryptedError(error);
    }
  }

  // creating common user
  async createUser(dto: UserCreateDto) {
    try {
      const existingUser = await this.userRepository.findOne({
        where: { email: dto.email },
      });
      if (existingUser) {
        return new HttpException('Already exists.', HttpStatus.CONFLICT);
      }

      const hashPassword = await bcryptjs.hash(dto.password, 5);

      const user = await this.userRepository.create({
        ...dto,
        password: hashPassword,
      });

      const role = await this.roleService.getRoleByValue('user');
      if (role instanceof HttpException) {
        return role as HttpException;
      }

      await user.$set('roles', [role.id]);
      user.roles = [role];

      const profile = this.profilesService.createProfile(user.id);
      if (profile instanceof HttpException) {
        return profile as HttpException;
      }

      await this.categoriesService.createDefaultCategories(user.id);

      return user;
    } catch (error) {
      return cryptedError(error);
    }
  }

  // getting all users
  async getAllUsers() {
    const users = await this.userRepository.findAll({ include: { all: true } });
    return users;
  }

  // getting user by id
  async getUserById(id: string) {
    try {
      const user = await this.userRepository.findByPk(id);

      if (!user) {
        return new HttpException('User not found.', HttpStatus.NOT_FOUND);
      }

      return user;
    } catch (error) {
      return cryptedError(error);
    }
  }

  // getting user by email
  async getUserByEmail(email: string) {
    try {
      const user = await this.userRepository.findOne({
        where: { email: email },
        include: { all: true },
      });

      if (!user) {
        return new HttpException('User not found.', HttpStatus.NOT_FOUND);
      }

      return user;
    } catch (error) {
      return cryptedError(error);
    }
  }

  // adding role to user
  async addRole(dto: UserAddRoleDto) {
    try {
      const user = await this.getUserByEmail(dto.email);
      if (user instanceof HttpException) {
        return user;
      }

      const role = await this.roleService.getRoleByValue(dto.roleName);
      if (role instanceof HttpException) {
        return role;
      }

      await user.$add('role', role.id);
      return dto;
    } catch (error) {
      return cryptedError(error);
    }
  }

  // adding role to user
  async removeRole(dto: UserAddRoleDto) {
    try {
      const user = await this.getUserByEmail(dto.email);
      if (user instanceof HttpException) {
        return user;
      }

      const role = await this.roleService.getRoleByValue(dto.roleName);
      if (role instanceof HttpException) {
        return role;
      }

      await user.$remove('role', role.id);
      return dto;
    } catch (error) {
      return cryptedError(error);
    }
  }
}
