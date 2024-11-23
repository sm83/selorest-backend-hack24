import { ApiProperty } from '@nestjs/swagger';
import { UUIDV4 } from 'sequelize';
import {
  Column,
  DataType,
  Table,
  Model,
  BelongsToMany,
  HasMany,
  HasOne,
} from 'sequelize-typescript';
import { UserRoles } from 'src/additionalModels/user-roles.model';
import { Category } from 'src/categories/categories.model';
import { Profile } from 'src/profiles/profiles.model';
import { Role } from 'src/roles/roles.model';
import { Wallet } from 'src/wallets/wallets.model';

interface UserCreationAttribute {
  email: string;
  password: string;
}

@Table({ tableName: 'users' })
export class User extends Model<User, UserCreationAttribute> {
  @ApiProperty({
    example: '3f9bb935-90eb-42cb-a391-732af255fbf4',
    description: 'Уникальный идентификатор',
  })
  @Column({
    type: DataType.UUID,
    defaultValue: UUIDV4,
    primaryKey: true,
  })
  id: string;

  @ApiProperty({
    example: 'user@mail.ru',
    description: 'Почтовый адрес пользователя',
  })
  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
  })
  email: string;

  @ApiProperty({
    example: 'hardbass123456',
    description: 'Пароль пользователя',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password: string;

  @BelongsToMany(() => Role, () => UserRoles)
  roles: Role[];

  @HasMany(() => Wallet)
  wallets: Wallet[];

  @HasMany(() => Wallet)
  categories: Category[];

  @HasOne(() => Profile)
  profile: Profile;
}
