import { forwardRef, Module } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { TransactionsController } from './transactions.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Transaction } from './transactions.model';
import { AuthModule } from 'src/auth/auth.module';
import { WalletsModule } from 'src/wallets/wallets.module';
import { CurrenciesModule } from 'src/currencies/currencies.module';
import { CategoriesModule } from 'src/categories/categories.module';

@Module({
  providers: [TransactionsService],
  controllers: [TransactionsController],
  imports: [
    SequelizeModule.forFeature([Transaction]),
    forwardRef(() => AuthModule),
    forwardRef(() => WalletsModule),
    forwardRef(() => CurrenciesModule),
    forwardRef(() => CategoriesModule),
  ],
})
export class TransactionsModule {}
