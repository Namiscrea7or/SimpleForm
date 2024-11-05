import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: 'https://simple-form-jk56-5bpqg80oh-nomas-projects-7fd2d87b.vercel.app',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'], // Specify allowed HTTP methods
    allowedHeaders: ['*'],
    credentials: true, // Needed if you're sending cookies (like with sessions)
  });


  await app.listen(process.env.PORT || 3001); // Use PORT environment variable if available or default to 3001
}
bootstrap();