import { ApiProperty } from '@nestjs/swagger';
import { IsIn, IsNumber, IsString, IsUUID } from 'class-validator';

export class WalletCreateDto {
  @IsString({ message: 'wallet-create: userId: Должно быть строкой' })
  @IsUUID('4')
  @ApiProperty({
    example: '3f9bb935-90eb-42cb-a391-732af255fbf4',
    description: 'Уникальный идентификатор пользователя',
  })
  readonly userId: string;

  @IsNumber({}, { message: 'wallet-create: currency: Должно быть числом' })
  @ApiProperty({
    example: '1',
    description: 'Идентификатор валюты',
  })
  readonly currency: number;

  @IsNumber({}, { message: 'wallet-create: balance: Должно быть числом' })
  @ApiProperty({
    example: '100.05',
    description: 'Стартовый баланс',
  })
  readonly balance: number;

  @IsString({ message: 'wallet-create: walletType: Должно быть строкой' })
  @IsIn(['cash', 'card'], {
    message: 'wallet-create: walletType: Должно быть cash либо card',
  })
  @ApiProperty({
    example: 'cash',
    description: 'cash или card',
  })
  readonly walletType: 'cash' | 'card';

  @IsString({ message: 'wallet-create: walletName: Должно быть строкой' })
  @ApiProperty({
    example: 'Карта Сбербанк',
    description: 'Пользовательское название кошелька',
  })
  readonly walletName: string;
}
