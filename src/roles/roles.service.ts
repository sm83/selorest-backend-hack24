import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Role } from './roles.model';
import { CreateRoleDto } from './dto/role-create.dto';
import cryptedError from 'src/utils/throwError';

@Injectable()
export class RolesService {
  constructor(@InjectModel(Role) private roleRepository: typeof Role) {}
  async getAllRoles() {
    try {
      const roles = await this.roleRepository.findAll();
      return roles;
    } catch (error) {
      return cryptedError(error);
    }
  }
  async getRoleByValue(roleName: string) {
    try {
      const role = await this.roleRepository.findOne({
        where: { roleName: roleName },
      });
      if (!role) {
        return new HttpException('Role not found.', HttpStatus.NOT_FOUND);
      }
      return role;
    } catch (error) {
      return cryptedError(error);
    }
  }
  async createRole(dto: CreateRoleDto) {
    try {
      const searchResult = await this.getRoleByValue(dto.roleName);

      if (
        searchResult &&
        searchResult.hasOwnProperty('roleName') &&
        searchResult.hasOwnProperty('priority')
      ) {
        return new HttpException('Already exists.', HttpStatus.CONFLICT);
      } else if (
        searchResult instanceof HttpException &&
        searchResult.getStatus() === HttpStatus.NOT_FOUND
      ) {
        const role = await this.roleRepository.create(dto);
        return role;
      } else {
        return new HttpException(
          'Unexpected error',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    } catch (error) {
      return cryptedError(error);
    }
  }
}
