import { forwardRef, Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './users.model';
import { RolesModule } from 'src/roles/roles.module';
import { AuthModule } from 'src/auth/auth.module';
import { ProfilesModule } from 'src/profiles/profiles.module';
import { CategoriesModule } from 'src/categories/categories.module';
import { WalletsModule } from 'src/wallets/wallets.module';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [
    SequelizeModule.forFeature([User]),
    forwardRef(() => RolesModule),
    forwardRef(() => AuthModule),
    forwardRef(() => ProfilesModule),
    forwardRef(() => CategoriesModule),
    forwardRef(() => WalletsModule),
  ],
  exports: [UsersService],
})
export class UsersModule {}
