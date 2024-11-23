import { ApiProperty } from '@nestjs/swagger';
import { IsISO4217CurrencyCode, IsString } from 'class-validator';

export class CurrencyCreateDto {
  @IsString({ message: 'currency-create: currencyName: Должно быть строкой' })
  @IsISO4217CurrencyCode()
  @ApiProperty({
    example: 'EUR',
    description: 'Название валюты',
  })
  readonly currencyName: string;

  @IsString({ message: 'currency-create: currencySymbol: Должно быть строкой' })
  @ApiProperty({
    example: '€',
    description: 'Символ валюты',
  })
  readonly currencySymbol: string;
}
