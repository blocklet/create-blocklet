import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

const port = process.env.BLOCKLET_PORT || process.env.PORT || 3000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: false,
  });
  await app.listen(port);
  console.log(`Blocklet app listening on port ${port}`);
}
bootstrap();
