import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { WalletCreateDto } from './dto/wallet-create.dto';
import cryptedError from 'src/utils/throwError';
import { InjectModel } from '@nestjs/sequelize';
import { Wallet } from './wallets.model';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class WalletsService {
  constructor(
    @InjectModel(Wallet) private walletRepository: typeof Wallet,
    private usersService: UsersService,
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

  async createWallet(dto: WalletCreateDto) {
    try {
      const user = await this.usersService.getUserById(dto.userId);

      if (user instanceof HttpException) {
        return user as HttpException;
      }

      const wallet = await this.walletRepository.create(dto);

      return wallet;
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
