import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { TransactionCreateDto } from './dto/transaction-create.dto';
import cryptedError from 'src/utils/throwError';
import { InjectModel } from '@nestjs/sequelize';
import { Transaction } from './transactions.model';
import { WalletsService } from 'src/wallets/wallets.service';
import { CurrenciesService } from 'src/currencies/currencies.service';
import { CategoriesService } from 'src/categories/categories.service';
import { printManualLog } from 'src/utils/manualLog';

@Injectable()
export class TransactionsService {
  constructor(
    @InjectModel(Transaction) private transactionRepository: typeof Transaction,
    private walletsService: WalletsService,
    private currenciesService: CurrenciesService,
    private categoriesService: CategoriesService,
  ) {}

  async getAllTransactions() {
    try {
      const transactions = await this.transactionRepository.findAll({
        where: { deleted: false },
      });

      return transactions;
    } catch (error) {
      return cryptedError(error);
    }
  }

  async getAllAndDeadTransactions() {
    try {
      const transactions = await this.transactionRepository.findAll();

      return transactions;
    } catch (error) {
      return cryptedError(error);
    }
  }

  async getTransactionById(id: string) {
    try {
      const transaction = await this.transactionRepository.findByPk(id);

      if (!transaction) {
        return new HttpException(
          'Transaction not found.',
          HttpStatus.NOT_FOUND,
        );
      }

      return transaction;
    } catch (error) {
      return cryptedError(error);
    }
  }

  async getTransactionsByWalletId(walletId: string) {
    try {
      const transaction = await this.transactionRepository.findAll({
        where: { walletId: walletId, deleted: false },
      });

      if (!transaction) {
        return new HttpException(
          'Transaction not found.',
          HttpStatus.NOT_FOUND,
        );
      }

      return transaction;
    } catch (error) {
      return cryptedError(error);
    }
  }

  async getTransactionsByCategoryId(categoryId: string) {
    try {
      const transaction = await this.transactionRepository.findAll({
        where: { categoryId: categoryId, deleted: false },
      });

      if (!transaction) {
        return new HttpException(
          'Transaction not found.',
          HttpStatus.NOT_FOUND,
        );
      }

      return transaction;
    } catch (error) {
      return cryptedError(error);
    }
  }

  // создание транзакции
  async createTransaction(dto: TransactionCreateDto) {
    try {
      const wallet = await this.walletsService.getWalletById(dto.walletId);

      if (wallet instanceof HttpException) {
        return wallet as HttpException;
      }

      const currency = await this.currenciesService.getCurrencyById(
        dto.currencyId,
      );

      if (currency instanceof HttpException) {
        return currency as HttpException;
      }

      const category = await this.categoriesService.getCategoryById(
        dto.categoryId,
      );

      if (category instanceof HttpException) {
        return category as HttpException;
      }

      const transaction = await this.transactionRepository.create(dto);

      if (transaction instanceof HttpException) {
        return transaction as HttpException;
      }

      await this.walletsService.changeWalletBalance({
        amount: dto.amount,
        currencyId: dto.currencyId,
        type: dto.type,
        walletId: dto.walletId,
      });

      const categoryChanged =
        await this.categoriesService.changeCategoryBalance({
          amount: dto.amount,
          categoryId: dto.categoryId,
          currencyId: dto.currencyId,
          type: dto.type,
        });

      printManualLog('categoryChanged: ');
      console.log(categoryChanged);

      return transaction;
    } catch (error) {
      return cryptedError(error);
    }
  }

  async deleteTransaction(id: string) {
    try {
      const transaction = await this.transactionRepository.findOne({
        where: { id },
      });

      if (!transaction) {
        return new HttpException(
          'Transaction not found.',
          HttpStatus.NOT_FOUND,
        );
      }

      if (transaction.deleted) {
        return new HttpException('Already deleted.', HttpStatus.GONE);
      } else {
        transaction.deleted = true;
        return await transaction.save();
      }
    } catch (error) {
      return cryptedError(error);
    }
  }
}
