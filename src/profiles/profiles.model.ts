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

@Table({ tableName: 'profiles' })
export class Profile extends Model<Profile> {
  @ApiProperty({
    example: '1',
    description: 'Уникальный идентификатор профиля',
  })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({
    example: '<binary data>',
    description: 'Изображение пользователя (в бинарном формате)',
  })
  @Column({
    type: DataType.BLOB,
    allowNull: true,
  })
  avatar: Buffer;

  @ApiProperty({
    example: 'user@mail.ru',
    description: 'Резервный почтовый адрес пользователя',
  })
  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  reserveEmail: string;

  @ForeignKey(() => User)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  userId: string;

  @BelongsTo(() => User)
  user: User;
}
