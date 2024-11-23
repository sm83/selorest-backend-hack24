import { ApiProperty } from '@nestjs/swagger';
import { IsIn, IsNumber, IsUUID } from 'class-validator';

export class TransactionCreateDto {
  @IsNumber({}, { message: 'transaction-create: amount: Должно быть числом.' })
  @ApiProperty({
    example: '1025.09',
    description: 'Количество денежных единиц',
  })
  readonly amount: number;

  @IsIn(['add', 'subtract'], {
    message: 'transaction-create: type: Должно быть add либо subtract.',
  })
  @ApiProperty({
    example: 'add или subtract',
    description: 'Доход либо расход',
  })
  readonly type: 'add' | 'subtract';

  @IsNumber(
    {},
    { message: 'transaction-create: currencyId: Должно быть числом.' },
  )
  @ApiProperty({
    example: '1',
    description: 'Уникальный идентификатор валюты',
  })
  readonly currencyId: number;

  @IsNumber(
    {},
    { message: 'transaction-create: categoryId: Должно быть числом.' },
  )
  @ApiProperty({
    example: '3',
    description: 'Уникальный идентификатор категории',
  })
  readonly categoryId: number;

  @IsUUID('4')
  @ApiProperty({
    example: '3f9bb935-90eb-42cb-a391-732af255fbf4',
    description: 'Уникальный идентификатор счета',
  })
  readonly walletId: string;
}
