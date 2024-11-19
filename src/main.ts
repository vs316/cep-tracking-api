import { ValidationPipe, Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
// import helmet from 'helmet';

async function bootstrap() {
  const logger = new Logger('Bootstrap');
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe()); // Use ValidationPipe here
  // Security middleware
  // app.use(
  //   helmet({
  //     contentSecurityPolicy: process.env.NODE_ENV === 'production',
  //   }),
  // );

  // const allowedOrigins = [
  //   'http://localhost:3001',
  //   'http://localhost:4173',
  //   'http://localhost:5173',
  // ];

  // logger.log(`Allowed Origins: ${allowedOrigins.join(', ')}`);

  app.enableCors({
    // origin: (origin, callback) => {
    //   if (!origin || allowedOrigins.includes(origin)) {
    //     callback(null, true);
    //   } else {
    //     logger.warn(`CORS error: ${origin} not allowed`);
    //     callback(new Error('Not allowed by CORS'));
    //   }
    // },
    origin: [
      'http://localhost:3001',
      'http://localhost:4173',
      'http://localhost:5173',
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
    allowedHeaders: [
      'Content-Type',
      'Authorization',
      'X-Requested-With',
      'Accept',
    ],
    credentials: true,
  });
  // Global prefix (optional)
  // app.setGlobalPrefix('api');

  await app.listen(3000, '0.0.0.0');
  logger.log('Application is listening on port 3000');
  logger.log('Allowed origins:', process.env.ALLOWED_ORIGINS.split(','));
}
bootstrap();
