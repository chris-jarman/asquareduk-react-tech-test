import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
    {
      // FIXME(cj): Once we have domain origins under control we should tighten this up.
      cors: true,
    },
  );

  await app.listen(3000, '0.0.0.0');
}
bootstrap();
