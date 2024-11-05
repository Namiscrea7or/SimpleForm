import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Corrected CORS configuration:
  const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:3000'; //Get from environment variables if available.  Use default otherwise
  app.enableCors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'], // Specify allowed HTTP methods
    allowedHeaders: ['*'],
    credentials: true, // Needed if you're sending cookies (like with sessions)
  });


  await app.listen(process.env.PORT || 3001); // Use PORT environment variable if available or default to 3001
}
bootstrap();