import { ApiProperty } from '@nestjs/swagger';
import { IsIn, IsString, IsUUID } from 'class-validator';

export class CategoryCreateDto {
  @IsString({ message: 'wallet-create: userId: Должно быть строкой' })
  @IsUUID('4')
  @ApiProperty({
    example: '3f9bb935-90eb-42cb-a391-732af255fbf4',
    description: 'Уникальный идентификатор пользователя',
  })
  readonly userId: string;

  @IsString({ message: 'category-create: categoryName: должно быть строкой' })
  @ApiProperty({
    example: 'Продукты',
    description: 'Название категории',
  })
  readonly categoryName: string;

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
