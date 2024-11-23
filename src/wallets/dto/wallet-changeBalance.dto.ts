import { ApiProperty } from '@nestjs/swagger';
import { IsIn, IsNumber, IsString } from 'class-validator';
import { IsUUID } from 'sequelize-typescript';

export class WalletChangeBalanceDto {
  @IsString({ message: 'wallet-changeBalance: walletId: Должно быть строкой' })
  @IsUUID('4')
  @ApiProperty({
    example: '3f9bb935-90eb-42cb-a391-732af255fbf4',
    description: 'Уникальный идентификатор счета',
  })
  readonly walletId: string;

  @ApiProperty({
    example: '1025.09',
    description: 'Количество денежных единиц',
  })
  @IsNumber({}, { message: 'wallet-changeBalance: amount: Должно быть числом' })
  readonly amount: number;

  @IsNumber({}, { message: 'wallet-changeBalance: amount: Должно быть числом' })
  readonly currencyId: number;

  @ApiProperty({
    example: '3f9bb935-90eb-42cb-a391-732af255fbf4',
    description: 'Уникальный идентификатор счета',
  })
  @IsString({ message: 'wallet-changeBalance: type: Должно быть строкой' })
  @IsIn(['add', 'subtract'], {
    message: 'wallet-changeBalance: type: должно быть add или subtract',
  })
  readonly type: 'add' | 'subtract';
}
