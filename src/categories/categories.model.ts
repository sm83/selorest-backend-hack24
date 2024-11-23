import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  DataType,
  Table,
  Model,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { User } from 'src/users/users.model';

interface CategoryCreationAttribute {
  userId: string;
  categoryName: string;
  categoryPriority: 'primary' | 'secondary' | 'other';
}

@Table({ tableName: 'categories' })
export class Category extends Model<Category, CategoryCreationAttribute> {
  @ApiProperty({
    example: '3f9bb935-90eb-42cb-a391-732af255fbf4',
    description: 'Уникальный идентификатор категории',
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

  @BelongsTo(() => User)
  user: User;
}
