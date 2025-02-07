import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { RolesModule } from './roles/roles.module';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './users/users.model';
import { Role } from './roles/roles.model';
import { UserRoles } from './additionalModels/user-roles.model';
import { AuthModule } from './auth/auth.module';
import { ProfilesModule } from './profiles/profiles.module';
import { TestsModule } from './tests/tests.module';
import { WalletsModule } from './wallets/wallets.module';
import { TransactionsModule } from './transactions/transactions.module';
import { Transaction } from './transactions/transactions.model';
import { Wallet } from './wallets/wallets.model';
import { CurrenciesModule } from './currencies/currencies.module';
import { Currency } from './currencies/currencies.model';
import { CategoriesModule } from './categories/categories.module';
import { Category } from './categories/categories.model';
import { Profile } from './profiles/profiles.model';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.env.${process.env.NODE_ENV}`,
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      models: [
        User,
        Role,
        UserRoles,
        Transaction,
        Wallet,
        Currency,
        Category,
        Profile,
      ],
      autoLoadModels: true,
    }),
    UsersModule,
    RolesModule,
    AuthModule,
    ProfilesModule,
    TestsModule,
    WalletsModule,
    TransactionsModule,
    CurrenciesModule,
    CategoriesModule,
  ],
  providers: [AppService],
})
export class AppModule {}
