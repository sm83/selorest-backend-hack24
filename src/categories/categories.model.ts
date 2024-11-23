import { ApiProperty } from '@nestjs/swagger';
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

interface CategoryCreationAttribute {
  userId: string;
  balance: number;
  currency: number;
  categoryName: string;
  categoryPriority: 'primary' | 'secondary' | 'other';
}

@Table({ tableName: 'categories' })
export class Category extends Model<Category, CategoryCreationAttribute> {
  @ApiProperty({
    example: '3',
    description: 'Идентификатор категории',
  })
  @Column({
    type: DataType.BIGINT,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: string;

  @ApiProperty({
    example: 'Продукты',
    description: 'Название категории',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  categoryName: string;

  @ApiProperty({
    example: 'Продукты',
    description: 'Название категории',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  categoryPriority: 'primary' | 'secondary' | 'other';

  @ApiProperty({
    example: '1002.9',
    description: 'Баланс категории',
  })
  @Column({
    type: DataType.FLOAT,
    allowNull: false,
  })
  balance: number;

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
  currency: number;

  @ForeignKey(() => User)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  userId: string;

  @BelongsTo(() => User)
  user: User;
}
