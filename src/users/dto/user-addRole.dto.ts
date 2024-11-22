import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class UserAddRoleDto {
  @IsEmail(
    {},
    { message: 'user-addRole: email - Должно быть электронной почтой' },
  )
  @ApiProperty({
    example: 'giant_sraka322@mail.ru',
    description: 'Почтовый адрес пользователя',
  })
  readonly email: string;

  @IsString({ message: 'user-addRole: roleName - Должно быть строкой' })
  @ApiProperty({
    example: 'admin',
    description: 'Выдаваемая роль',
  })
  readonly roleName: string;
}
