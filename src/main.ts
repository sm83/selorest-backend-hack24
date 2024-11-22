import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { printManualLog } from './utils/manualLog';
import * as cookieParser from 'cookie-parser';

async function start() {
  const PORT = process.env.PORT || 3010;

  const app = await NestFactory.create(AppModule);

  const allowedOrigins = [
    'http://localhost:3000',
    'http://23.137.250.242:3000',
  ];

  app.enableCors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    methods: 'GET,POST,PUT,DELETE,UPDATE',
    allowedHeaders: 'Content-Type, Authorization',
    credentials: true,
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
