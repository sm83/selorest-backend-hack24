import { ApiProperty } from '@nestjs/swagger';

import {
  Column,
  DataType,
  Table,
  Model,
  BelongsTo,
  ForeignKey,
} from 'sequelize-typescript';
import { Category } from 'src/categories/categories.model';
import { Currency } from 'src/currencies/currencies.model';
import { Wallet } from 'src/wallets/wallets.model';

interface TransactionCreationAttribute {
  amount: number;
  type: 'add' | 'subtract';
  currencyId: number;
  categoryId: number;
  walletId: string;
}

@Table({ tableName: 'transactions' })
export class Transaction extends Model<
  Transaction,
  TransactionCreationAttribute
> {
  @ApiProperty({
    example: '3f9bb935-90eb-42cb-a391-732af255fbf4',
    description: 'Уникальный идентификатор',
  })
  @Column({
    type: DataType.BIGINT,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: string;

  @Column({
    type: DataType.FLOAT,
    allowNull: false,
  })
  amount: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  type: 'add' | 'subtract';

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  deleted: boolean;

  @ForeignKey(() => Currency)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  currencyId: number;

  @BelongsTo(() => Currency)
  currency: Currency;

  @ForeignKey(() => Wallet)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  walletId: string;

  @BelongsTo(() => Wallet)
  wallet: Wallet;

  @ForeignKey(() => Category)
  @Column({
    type: DataType.BIGINT,
    allowNull: false,
  })
  categoryId: number;

  @BelongsTo(() => Category)
  category: Category;
}
