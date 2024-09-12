import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
	  cors: {
		  origin: "*",
		  methods: "GET,POST,PUT,DELETE",
		  credentials: false
	  }
  });
  await app.listen(3000);
}
bootstrap();
