import {
  ArgumentMetadata,
  HttpException,
  HttpStatus,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';

@Injectable()
export class ValidationPipe implements PipeTransform<any> {
  async transform(value: any, metadata: ArgumentMetadata): Promise<any> {
    const { metatype } = metadata;

    // Проверяем, является ли тип валидируемым
    if (
      !metatype ||
      metatype === String ||
      metatype === Boolean ||
      metatype === Number ||
      metatype === Array ||
      metatype === Object
    ) {
      return value;
    }

    // Преобразуем входные данные в нужный класс и валидируем
    const object = plainToClass(metatype, value);
    const errors = await validate(object);

    if (errors.length > 0) {
      const messages = errors.map(
        (err) => `${Object.values(err.constraints).join(', ')}`,
      );
      throw new HttpException(
        { statusCode: HttpStatus.BAD_REQUEST, messages },
        HttpStatus.BAD_REQUEST,
      );
    }

    return value;
  }
}
