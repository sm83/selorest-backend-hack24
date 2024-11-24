import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { printManualLog } from './utils/manualLog';
import * as cookieParser from 'cookie-parser';

async function start() {
  const PORT = process.env.PORT || 3010;

  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: '*',
    methods: 'GET,POST,PUT,DELETE,UPDATE,PATCH',
    allowedHeaders: 'Content-Type, Authorization',
  });

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Backend')
    .setDescription('REST API Documentation')
    .setVersion('1.0.0')
    .addTag('rest')
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('/api/docs', app, document);

  const cookieSecretArray: string[] =
    process.env.COOKIE_SECRET_ARRAY.split('-');

  app.use(cookieParser(cookieSecretArray));

  await app.listen(PORT, () => {
    printManualLog(`Server is running on port ${PORT}...`);
  });
}
start();
