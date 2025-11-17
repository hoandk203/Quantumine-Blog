import { NestFactory } from '@nestjs/core';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import * as cookieParser from 'cookie-parser';
import * as express from 'express';
import { AppModule } from './app.module';
import { webcrypto } from 'crypto';

async function bootstrap() {
  if (!global.crypto) {
    global.crypto = webcrypto as any;
  }

  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  // Cookie parser middleware
  app.use(cookieParser());

  // Tăng giới hạn payload cho base64 images (50MB)
  app.use(express.json({ limit: '50mb' }));
  app.use(express.urlencoded({ limit: '50mb', extended: true }));

  // Enable CORS
  // Note: In production with nginx reverse proxy, CORS is handled by nginx
  // Only enable CORS in development or when not behind proxy
  const enableBackendCors = process.env.ENABLE_BACKEND_CORS === 'true' || process.env.NODE_ENV !== 'production';

  if (enableBackendCors) {
    app.enableCors({
      origin: [
        process.env.FRONTEND_URL,
        'https://quant-blog-ten.vercel.app',
        'http://localhost:3000',
      ],
      credentials: true,
    });
  }

  // Global validation pipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // API versioning
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
  });

  // Swagger documentation
  const config = new DocumentBuilder()
    .setTitle('Quant Blog API')
    .setDescription('The Quant Blog API documentation')
    .setVersion('1.0')
    .addBearerAuth()
    .addTag('Authentication', 'User authentication endpoints')
    .addTag('Posts', 'Blog posts management')
    .addTag('Categories', 'Categories management')
    .addTag('Tags', 'Tags management')
    .addTag('Comments', 'Comments management')
    .addTag('Users', 'User management')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  if (process.env.NODE_ENV !== 'production') {
    SwaggerModule.setup('api/docs', app, document, {
      swaggerOptions: {
        persistAuthorization: true,
      },
    });
  }

  const port = process.env.PORT || 5000;
  await app.listen(port, '0.0.0.0');
}
bootstrap();
