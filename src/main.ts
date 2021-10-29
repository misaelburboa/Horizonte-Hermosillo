import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './modules/app.module';
import * as helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // INFO: Setup middlewares
  app.use(helmet());
  app.enableCors();

  app.setGlobalPrefix('horizonte-hermosillo/v1');

  const config = new DocumentBuilder()
    .setTitle('Horizonte Hermosillo Api')
    .setDescription(
      'Api for interacting with the website or mobile application',
    )
    .setVersion('0.1.0')
    .addBearerAuth()
    .setBasePath('horizonte-hermosillo/v1')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('horizonte-hermosillo/v1/docs', app, document);

  await app.listen(process.env.PORT || 4000);
}
bootstrap();
