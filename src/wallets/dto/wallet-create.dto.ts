import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, IsUUID } from 'class-validator';

export class WalletCreateDto {
  @IsString({ message: 'wallet-create: userId: Должно быть строкой' })
  @IsUUID('4')
  @ApiProperty({
    example: '3f9bb935-90eb-42cb-a391-732af255fbf4',
    description: 'Уникальный идентификатор пользователя',
  })
  readonly userId: string;

  @IsString({ message: 'wallet-create: currency: Должно быть строкой' })
  @ApiProperty({
    example: 'rubles',
    description: 'Валюта',
  })
  readonly currency: string;

  @IsNumber({}, { message: 'wallet-create: balance: Должно быть числом' })
  @ApiProperty({
    example: '100.05',
    description: 'Стартовый баланс',
  })
  readonly balance: number;
}
