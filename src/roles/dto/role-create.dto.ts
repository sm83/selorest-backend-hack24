import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, Max, Min } from 'class-validator';

export class CreateRoleDto {
  @IsString({ message: 'roleName: Должно быть строкой' })
  @ApiProperty({
    example: 'ADMIN',
    description: 'Создаваемая роль',
  })
  readonly roleName: string;

  @IsNumber({}, { message: 'priority: Должно быть числом' })
  @Min(1, { message: 'priority: Должно быть в диапазоне 1-16' })
  @Max(16, { message: 'priority: Должно быть в диапазоне 1-16' })
  @ApiProperty({
    example: 'ADMIN',
    description: 'Создаваемая роль',
  })
  readonly priority: number;

  @IsString({ message: 'description: Должно быть строкой' })
  @ApiProperty({
    example: 'ADMIN',
    description: 'Создаваемая роль',
  })
  readonly description?: string;
}
