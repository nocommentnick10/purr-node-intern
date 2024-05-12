import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const PORT = process.env.PORT || 3000;
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());

  const config = new DocumentBuilder()
                    .setTitle("purr-react-intern")
                    .setDescription("Документация RESTful API с авторизацией для trello на nestjs")
                    .setVersion("1.0")
                    .build();
  const docs = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, docs);

  await app.listen(PORT);
}
bootstrap();
