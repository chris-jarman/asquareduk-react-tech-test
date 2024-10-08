import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';

import { sql } from 'kysely';

import { AppModule } from './app.module.js';

import { DbService } from './db.service.js';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
    {
      // FIXME(cj): Once we have domain origins under control we should tighten this up.
      cors: true,
    },
  );

  // FIXME(cj): Hoist this into a migration.
  const db = app.get(DbService);
  await db.query(sql`
    create table if not exists drinks(
      pk bigserial primary key,
      slug varchar unique not null,
      name varchar not null,
      description varchar not null
    );

    create index if not exists drinks_slug_idx on drinks(slug);
    create index if not exists drinks_name_idx on drinks(name);

    insert into drinks(slug, name, description) values
      ('1', 'Beer', 'A beer is a beverage made from fermented grains, typically malted barley, hops, yeast, and water.'),
      ('2', 'Wine', 'A wine is a beverage made from fermented grapes.'),
      ('3', 'Whisky', 'Whisky is a pleasant, thirst-quenching drink enjoyed by all.')
    on conflict do nothing;
  `);

  await app.listen(3000, '0.0.0.0');
}
bootstrap();
