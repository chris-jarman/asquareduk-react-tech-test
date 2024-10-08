import { Injectable } from '@nestjs/common';

import pg from 'pg';

import { Kysely, PostgresDialect, RawBuilder } from 'kysely';

@Injectable()
export class DbService {
  private readonly db: Kysely<any>;

  constructor() {
    this.db = new Kysely({
      dialect: new PostgresDialect({
        pool: new pg.Pool({
          database: 'postgres',
          host: 'localhost',
          user: 'postgres',
          password: 'guest',
          port: 5432,
          max: 10,
        }),
      }),
    });
  }

  async query<T>(sql: RawBuilder<T>) {
    const result = sql.execute(this.db);
    return result;
  }
}
