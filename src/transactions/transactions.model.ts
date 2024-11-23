import { ApiProperty } from '@nestjs/swagger';

import {
  Column,
  DataType,
  Table,
  Model,
  BelongsTo,
  ForeignKey,
} from 'sequelize-typescript';
import { Wallet } from 'src/wallets/wallets.model';

interface TransactionCreationAttribute {
  currency: string;
  balance: number;
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

  @ApiProperty({
    example: '3f9bb935-90eb-42cb-a391-732af255fbf4',
    description: 'Уникальный идентификатор',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  currency: string;

  @Column({
    type: DataType.FLOAT,
    allowNull: false,
  })
  balance: number;

  @ForeignKey(() => Wallet)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  walletId: string;

  @BelongsTo(() => Wallet)
  wallet: Wallet;
}
