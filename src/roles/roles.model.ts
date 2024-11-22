interface RoleCreationAttributes {
  roleName: string;
  description: string;
  priority: number;
}

import { ApiProperty } from '@nestjs/swagger';
import {
  BelongsToMany,
  Column,
  DataType,
  Model,
  Table,
} from 'sequelize-typescript';
import { UserRoles } from 'src/additionalModels/user-roles.model';
import { User } from 'src/users/users.model';

@Table({ tableName: 'roles' })
export class Role extends Model<Role, RoleCreationAttributes> {
  @ApiProperty({ example: '1', description: 'Уникальный идентификатор' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: 'ADMIN', description: 'Роль пользователя' })
  @Column({ type: DataType.STRING })
  roleName: string;

  @ApiProperty({ example: 'Полный доступ', description: 'Описание привилегий' })
  @Column({ type: DataType.STRING })
  description: string;

  @ApiProperty({
    example: 'Приоритет роли',
    description: '127 - Наивысший приоритет, 0 - самый низкий',
  })
  @Column({ type: DataType.INTEGER })
  priority: number;

  @BelongsToMany(() => User, () => UserRoles)
  users: User[];
}
