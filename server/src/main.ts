import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: '*', // Allow any origin (USE WITH CAUTION IN PRODUCTION)
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['*'], 
    credentials: true, 
  });


  await app.listen(process.env.PORT || 3001); // Use PORT environment variable if available or default to 3001
}
bootstrap();