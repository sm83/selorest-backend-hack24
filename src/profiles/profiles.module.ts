import { forwardRef, Module } from '@nestjs/common';
import { ProfilesController } from './profiles.controller';
import { ProfilesService } from './profiles.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Profile } from './profiles.model';
import { AuthModule } from 'src/auth/auth.module';
import { UsersModule } from 'src/users/users.module';

@Module({
  controllers: [ProfilesController],
  providers: [ProfilesService],
  imports: [
    SequelizeModule.forFeature([Profile]),
    forwardRef(() => UsersModule),
    forwardRef(() => AuthModule),
  ],
  exports: [ProfilesService],
})
export class ProfilesModule {}
