import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const port = process.env.PORT || 5000;
  const app = await NestFactory.create(AppModule);

  // Swagger
  const config = new DocumentBuilder()
    .setTitle(`${process.env.PROJECT_NAME} API`)
    .setDescription(
      `The API documentation for the ${process.env.PROJECT_NAME} application`,
    )
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);

  // Launch
  await app.listen(port);
  Logger.log(
    `🚀 ${process.env.PROJECT_NAME} backend is running on http://localhost:${port}`,
  );
  Logger.log(`Swagger UI available at http://localhost:${port}/swagger`);
}
bootstrap();
