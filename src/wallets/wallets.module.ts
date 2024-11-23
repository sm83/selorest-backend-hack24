import { forwardRef, Module } from '@nestjs/common';
import { WalletsController } from './wallets.controller';
import { WalletsService } from './wallets.service';
import { Wallet } from './wallets.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { UsersModule } from 'src/users/users.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [WalletsController],
  providers: [WalletsService],
  imports: [
    SequelizeModule.forFeature([Wallet]),
    forwardRef(() => UsersModule),
    forwardRef(() => AuthModule),
  ],
})
export class WalletsModule {}
