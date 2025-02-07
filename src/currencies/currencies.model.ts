import { ApiProperty } from '@nestjs/swagger';
import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';
import { Category } from 'src/categories/categories.model';
import { Wallet } from 'src/wallets/wallets.model';

interface CurrencyCreationAttributes {
  currencyName: string;
  currencySymbol: string;
}

@Table({ tableName: 'currencies' })
export class Currency extends Model<Currency, CurrencyCreationAttributes> {
  @ApiProperty({
    example: '1',
    description: 'Идентификатор валюты',
  })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  currencyName: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  currencySymbol: string;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  deleted: boolean;

  @HasMany(() => Category)
  category: Category;

  @HasMany(() => Wallet)
  wallet: Wallet;
}
