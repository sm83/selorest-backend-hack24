import { ApiProperty } from '@nestjs/swagger';
import { UUIDV4 } from 'sequelize';
import {
  Column,
  DataType,
  Table,
  Model,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { Currency } from 'src/currencies/currencies.model';
import { User } from 'src/users/users.model';

interface WalletCreationAttribute {
  userId: string;
  currencyId: number;
  balance: number;
  walletType: 'card' | 'cash';
  walletName: string;
}

@Table({ tableName: 'wallets' })
export class Wallet extends Model<Wallet, WalletCreationAttribute> {
  @ApiProperty({
    example: '3f9bb935-90eb-42cb-a391-732af255fbf4',
    description: 'Уникальный идентификатор счета',
  })
  @Column({
    type: DataType.UUID,
    defaultValue: UUIDV4,
    primaryKey: true,
  })
  id: string;

  @Column({
    type: DataType.FLOAT,
    allowNull: false,
  })
  balance: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  walletType: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  walletName: string;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  deleted: boolean;

  @ForeignKey(() => User)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  userId: string;

  @ForeignKey(() => Currency)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  currency: number;

  @BelongsTo(() => User)
  user: User;
}
