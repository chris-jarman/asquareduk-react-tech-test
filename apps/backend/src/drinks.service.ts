import { Injectable, NotFoundException } from '@nestjs/common';

import { sql } from 'kysely';

import type { Drink } from 'shared-types/drinks';

import { DbService } from './db.service.js';

type PaginationParams = {
  offset?: number;
  limit?: number;
};

const MAX_PAGE_SIZE = 100;

@Injectable()
export class DrinksService {
  constructor(private readonly db: DbService) {}

  async getDrinks({
    offset = 0,
    limit = MAX_PAGE_SIZE,
  }: PaginationParams = {}) {
    const { rows: drinks } = await this.db.query<Drink>(sql`
      select *
      from drinks
      offset ${offset}
      limit ${limit}
      ;
    `);
    return drinks;
  }

  async getDrinkBySlug(slug: string) {
    const { rows } = await this.db.query<Drink>(sql`
      select *
      from drinks
      where slug = ${slug}
      ;
    `);
    const drink = rows.at(0);
    if (!drink) {
      throw new NotFoundException(`Drink with slug ${slug} not found`);
    }
    return drink;
  }
}
