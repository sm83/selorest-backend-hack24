import { ApiProperty } from '@nestjs/swagger';
import { IsIn, IsNumber, IsString } from 'class-validator';

export class CategoryChangeBalanceDto {
  @IsNumber(
    {},
    { message: 'category-changeBalance: amount: Должно быть числом' },
  )
  @ApiProperty({
    example: '1',
    description: 'Уникальный идентификатор категории',
  })
  readonly categoryId: number;

  @ApiProperty({
    example: '1025.09',
    description: 'Количество денежных единиц',
  })
  @IsNumber(
    {},
    { message: 'category-changeBalance: amount: Должно быть числом' },
  )
  readonly amount: number;

  @IsNumber(
    {},
    { message: 'category-changeBalance: amount: Должно быть числом' },
  )
  readonly currencyId: number;

  @ApiProperty({
    example: '3f9bb935-90eb-42cb-a391-732af255fbf4',
    description: 'Уникальный идентификатор счета',
  })
  @IsString({ message: 'category-changeBalance: type: Должно быть строкой' })
  @IsIn(['add', 'subtract'], {
    message: 'category-changeBalance: type: должно быть add или subtract',
  })
  readonly type: 'add' | 'subtract';
}
