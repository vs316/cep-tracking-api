import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
//import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe()); // Use ValidationPipe here
  //const configService = app.get(ConfigService);

  app.enableCors({
    // origin: (origin, callback) => {
    //   const allowedOrigins = process.env.ALLOWED_ORIGINS.split(',');
    //   if (!origin || allowedOrigins.includes(origin)) {
    //     callback(null, true);
    //   } else {
    //     console.warn(`CORS error: ${origin} not allowed`);
    //     callback(new Error('Not allowed by CORS'));
    //   }
    // },
    origin: ['http://localhost:3001', 'http://localhost:5173'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'], // Including OPTIONS
    allowedHeaders: [
      'Content-Type',
      'Authorization',
      'X-Requested-With',
      'Accept',
    ], // Allow required headers
    credentials: true,
  });

  await app.listen(3000);
}
bootstrap();
