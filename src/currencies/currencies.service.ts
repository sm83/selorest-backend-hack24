import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Currency } from './currencies.model';
import cryptedError from 'src/utils/throwError';
import { CurrencyCreateDto } from './dto/currency-create.dto';

@Injectable()
export class CurrenciesService {
  constructor(
    @InjectModel(Currency) private currenciesRepository: typeof Currency,
  ) {}

  async getAvaliableCurrencies() {
    try {
      const currencies = await this.currenciesRepository.findAll({
        where: { deleted: false },
      });

      return currencies;
    } catch (error) {
      return cryptedError(error);
    }
  }

  async getAllAndDeadCurrencies() {
    try {
      const currencies = await this.currenciesRepository.findAll();

      return currencies;
    } catch (error) {
      return cryptedError(error);
    }
  }

  async getCurrencyById(id: number) {
    try {
      const currency = await this.currenciesRepository.findByPk(id);

      if (!currency) {
        return new HttpException('Currency not found.', HttpStatus.NOT_FOUND);
      }

      return currency;
    } catch (error) {
      return cryptedError(error);
    }
  }

  async getCurrencyByName(currencyName: string) {
    try {
      const currency = await this.currenciesRepository.findOne({
        where: { currencyName },
      });

      if (!currency) {
        return new HttpException('Currency not found.', HttpStatus.NOT_FOUND);
      }

      return currency;
    } catch (error) {
      return cryptedError(error);
    }
  }

  async createCurrency(dto: CurrencyCreateDto) {
    try {
      const currency = await this.currenciesRepository.create(dto);

      return currency;
    } catch (error) {
      return cryptedError(error);
    }
  }

  async deleteCurrency(id: string) {
    try {
      const currency = await this.currenciesRepository.findOne({
        where: { id },
      });

      if (!currency) {
        return new HttpException('Currency not found.', HttpStatus.NOT_FOUND);
      }

      if (currency.deleted) {
        return new HttpException('Already deleted.', HttpStatus.GONE);
      } else {
        currency.deleted = true;
        return await currency.save();
      }
    } catch (error) {
      return cryptedError(error);
    }
  }
}
