import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, Length } from 'class-validator';

export class UserCreateDto {
  @IsString({ message: 'user-create: Должно быть строкой' })
  @IsEmail({}, { message: 'user-create: Некорректный email' })
  @ApiProperty({
    example: 'user@mail.ru',
    description: 'Почтовый адрес пользователя',
  })
  readonly email: string;

  @IsString({ message: 'user-create: Должно быть строкой' })
  @Length(5, 64, {
    message:
      'user-create: Пароль должен быть не менее 5 и не более 64 символов',
  })
  @ApiProperty({
    example: 'hardbass123456',
    description: 'Пароль пользователя',
  })
  readonly password: string;
}
