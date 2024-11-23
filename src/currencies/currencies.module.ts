import { forwardRef, Module } from '@nestjs/common';
import { CurrenciesService } from './currencies.service';
import { CurrenciesController } from './currencies.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Currency } from './currencies.model';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  providers: [CurrenciesService],
  controllers: [CurrenciesController],
  imports: [
    SequelizeModule.forFeature([Currency]),
    forwardRef(() => AuthModule),
  ],
  exports: [CurrenciesService],
})
export class CurrenciesModule {}
