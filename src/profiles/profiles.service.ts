import {
  forwardRef,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
} from '@nestjs/common';
import { Profile } from './profiles.model';
import { InjectModel } from '@nestjs/sequelize';
import cryptedError from 'src/utils/throwError';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class ProfilesService {
  constructor(
    @InjectModel(Profile) private profileRepository: typeof Profile,
    @Inject(forwardRef(() => UsersService)) private usersService: UsersService,
  ) {}

  // creating common user
  async createProfile(userId: string) {
    try {
      const user = await this.usersService.getUserById(userId);

      if (user instanceof HttpException) {
        return user as HttpException;
      }

      const profile = await this.profileRepository.create({ userId: user.id });

      return profile;
    } catch (error) {
      return cryptedError(error);
    }
  }

  async getAllProfiles() {
    try {
      const profiles = await this.profileRepository.findAll({
        include: { all: true },
      });

      return profiles;
    } catch (error) {
      return cryptedError(error);
    }
  }

  async getProfileByUserId(userId: string) {
    try {
      const user = await this.usersService.getUserById(userId);

      if (user instanceof HttpException) {
        return user as HttpException;
      }

      const profile = await this.profileRepository.findOne({
        where: { userId: user.id },
        include: { all: true },
      });

      return profile;
    } catch (error) {
      return cryptedError(error);
    }
  }

  async getProfileById(id: string) {
    try {
      const profile = await this.profileRepository.findByPk(id);

      if (!profile) {
        return new HttpException(
          'Профиль по указанному id отсутствует.',
          HttpStatus.NOT_FOUND,
        );
      }

      return profile;
    } catch (error) {
      return cryptedError(error);
    }
  }
}
