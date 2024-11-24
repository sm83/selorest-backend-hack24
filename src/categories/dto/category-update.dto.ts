import { ApiProperty } from '@nestjs/swagger';
import { IsIn, IsNumber, IsString } from 'class-validator';

export class CategoryUpdateDto {
  @IsString({ message: 'category-create: categoryName: должно быть строкой' })
  @ApiProperty({
    example: 'Продукты',
    description: 'Название категории',
  })
  readonly categoryName: string;

  @IsNumber({}, { message: 'wallet-create: balance: Должно быть числом' })
  @ApiProperty({
    example: '100.05',
    description: 'баланс',
  })
  readonly balance: number;

  @IsString({
    message: 'category-create: categoryPriority: должно быть строкой',
  })
  @IsIn(['primary', 'secondary', 'other'], {
    message:
      'category-create: categoryPriority: должно быть одним из значений: primary, secondary, other',
  })
  @ApiProperty({
    example: 'Продукты',
    description: 'Приоритет категории',
  })
  readonly categoryPriority: 'primary' | 'secondary' | 'other';
}
