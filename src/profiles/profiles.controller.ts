import {
  Controller,
  Get,
  HttpException,
  Param,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ProfilesService } from './profiles.service';
import { Profile } from './profiles.model';
import { Roles } from 'src/auth/roles-auth.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

import { Expose, plainToInstance, Type } from 'class-transformer';

class UserDto {
  @Expose()
  id: string;
  @Expose()
  email: string;
}

export class ProfileResponseDto {
  @Expose()
  avatar: string;

  @Expose()
  reserveEmail: string;

  @Type(() => UserDto)
  @Expose()
  user: UserDto;
}

@ApiTags('Профили')
@Controller('profiles')
export class ProfilesController {
  constructor(private profilesService: ProfilesService) {}

  @ApiOperation({ summary: 'Получение списка всех пользователей' })
  @ApiResponse({ status: 200, type: [Profile] })
  @Roles('admin')
  @UseGuards(RolesGuard)
  @Get()
  async getAll() {
    const result = await this.profilesService.getAllProfiles();

    if (result instanceof HttpException) {
      // imposible to go here, getAllProfiles() always return result, at least [].
      throw result;
    }

    return result;
  }

  @ApiOperation({
    summary: 'Получение профиля по id пользователя',
  })
  @ApiResponse({ status: 200 })
  @UseGuards(JwtAuthGuard)
  @Get('/user-id/:id')
  async getByUserId(@Param('id') id: string) {
    const result = await this.profilesService.getProfileByUserId(id);

    if (result instanceof HttpException) {
      throw result;
    }

    return plainToInstance(ProfileResponseDto, result, {
      excludeExtraneousValues: true,
    });
  }

  @ApiOperation({
    summary: 'Получение профиля по id профиля',
  })
  @ApiResponse({ status: 200 })
  @Roles('admin')
  @UseGuards(RolesGuard)
  @Get('/id/:id')
  async getById(@Param('id') id: string) {
    const result = await this.profilesService.getProfileById(id);

    if (result instanceof HttpException) {
      throw result;
    }

    return result;
  }
}
