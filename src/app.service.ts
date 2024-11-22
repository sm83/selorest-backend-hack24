import { HttpException, Injectable, OnModuleInit } from '@nestjs/common';
import { UsersService } from './users/users.service';
import { RolesService } from './roles/roles.service';
import { printManualLog } from './utils/manualLog';

@Injectable()
export class AppService implements OnModuleInit {
  constructor(
    private readonly usersService: UsersService,
    private readonly rolesService: RolesService,
  ) {}

  async onModuleInit() {
    await this.initializeData();
  }

  private async initializeData() {
    // Проверка существования ролей
    const roles = await this.rolesService.getAllRoles();

    if (roles instanceof HttpException) {
      console.error('roles is HttpException');
    } else {
      if (roles.length === 0) {
        await this.rolesService.createRole({
          roleName: 'user',
          priority: 4,
          description: 'common user',
        });
        await this.rolesService.createRole({
          roleName: 'admin',
          priority: 16,
          description: 'admin with all avaliable right',
        });
        printManualLog('Admin and User roles created.');
      }

      // Проверка существования пользователей
      const users = await this.usersService.getAllUsers();
      if (users.length === 0) {
        await this.usersService.createAdminUser({
          email: process.env.ADMIN_EMAIL,
          password: process.env.ADMIN_PASSWORD,
        });

        printManualLog('Admin user created.');
      }
    }
  }
}
