import {
  forwardRef,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
} from '@nestjs/common';
import { WalletCreateDto } from './dto/wallet-create.dto';
import cryptedError from 'src/utils/throwError';
import { InjectModel } from '@nestjs/sequelize';
import { Wallet } from './wallets.model';
import { UsersService } from 'src/users/users.service';
import { CurrenciesService } from 'src/currencies/currencies.service';
import { WalletChangeBalanceDto } from './dto/wallet-changeBalance.dto';

@Injectable()
export class WalletsService {
  constructor(
    @InjectModel(Wallet) private walletRepository: typeof Wallet,
    @Inject(forwardRef(() => UsersService)) private usersService: UsersService,
    private currenciesService: CurrenciesService,
  ) {}

  async getAllWallets() {
    try {
      const wallets = await this.walletRepository.findAll({
        where: { deleted: false },
      });

      return wallets;
    } catch (error) {
      return cryptedError(error);
    }
  }

  async getAllAndDeadWallets() {
    try {
      const wallet = await this.walletRepository.findAll();

      return wallet;
    } catch (error) {
      return cryptedError(error);
    }
  }

  async getWalletById(id: string) {
    try {
      const wallet = await this.walletRepository.findByPk(id);

      if (!wallet) {
        return new HttpException('Wallet not found.', HttpStatus.NOT_FOUND);
      }

      return wallet;
    } catch (error) {
      return cryptedError(error);
    }
  }

  async getWalletsByUserId(userId: string) {
    try {
      const user = await this.usersService.getUserById(userId);

      if (user instanceof HttpException) {
        return user as HttpException;
      }

      const wallets: Wallet[] = await this.walletRepository.findAll({
        where: { userId: user.id },
      });

      return wallets;
    } catch (error) {
      return cryptedError(error);
    }
  }

  async createWallet(dto: WalletCreateDto) {
    try {
      const user = await this.usersService.getUserById(dto.userId);

      if (user instanceof HttpException) {
        return user as HttpException;
      }

      const currency = await this.currenciesService.getCurrencyById(
        dto.currency,
      );

      if (currency instanceof HttpException) {
        return currency as HttpException;
      }

      const wallet = await this.walletRepository.create(dto);

      return wallet;
    } catch (error) {
      return cryptedError(error);
    }
  }

  async createInitialWalletsForUser(userId: string) {
    try {
      const user = await this.usersService.getUserById(userId);

      if (user instanceof HttpException) {
        return user as HttpException;
      }

      const initialWallets: Wallet[] = [];

      const initialWalletsSchema: WalletCreateDto[] = [
        {
          balance: 0,
          currency: 1,
          userId: user.id,
          walletType: 'cash',
          walletName: 'Наличные',
        },
        {
          balance: 0,
          currency: 1,
          userId: user.id,
          walletType: 'card',
          walletName: 'Карта',
        },
      ];

      initialWalletsSchema.forEach(async (schemaItem: WalletCreateDto) => {
        const result = await this.createWallet(schemaItem);

        if (result instanceof HttpException) {
          console.error('createInitialWalletsForUser: HttpException');
          console.log(result);
        } else {
          initialWallets.push(result);
        }
      });

      return initialWallets;
    } catch (error) {
      return cryptedError(error);
    }
  }

  async changeWalletBalance(dto: WalletChangeBalanceDto) {
    try {
      const wallet = await this.walletRepository.findOne({
        where: { id: dto.walletId },
      });

      if (wallet instanceof HttpException) {
        return wallet as HttpException;
      }

      if (wallet.deleted) {
        return new HttpException('Wallet was deleted.', HttpStatus.GONE);
      }

      if (wallet.currency !== dto.currencyId) {
        return new HttpException(
          'Currencies are diferent.',
          HttpStatus.BAD_REQUEST,
        );
      }

      if (dto.type === 'add') {
        wallet.balance += dto.amount;
      } else {
        wallet.balance -= dto.amount;
      }

      return await wallet.save();
    } catch (error) {
      return cryptedError(error);
    }
  }

  async deleteWallet(id: string) {
    try {
      const wallet = await this.walletRepository.findOne({ where: { id } });

      if (!wallet) {
        return new HttpException('Wallet not found', HttpStatus.NOT_FOUND);
      }

      if (wallet.deleted) {
        return new HttpException('Already deleted.', HttpStatus.GONE);
      } else {
        wallet.deleted = true;
        return await wallet.save();
      }
    } catch (error) {
      return cryptedError(error);
    }
  }
}
