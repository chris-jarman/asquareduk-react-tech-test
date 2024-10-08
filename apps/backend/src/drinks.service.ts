import { Injectable, NotFoundException } from '@nestjs/common';

import { sql } from 'kysely';

import { DbService } from './db.service.js';

@Injectable()
export class DrinksService {
  constructor(private readonly db: DbService) {}

  async getDrinks() {
    const { rows: drinks } = await this.db.query<Drink>(sql`
      select * from drinks;
    `);
    return drinks;
  }

  async getDrinkBySlug(slug: string) {
    const { rows } = await this.db.query<Drink>(sql`
      select * from drinks where slug = ${slug};
    `);
    const drink = rows.at(0);
    if (!drink) {
      throw new NotFoundException(`Drink with slug ${slug} not found`);
    }
    return drink;
  }
}

// FIXME(cj): Hoist this into a shared package.
type Drink = {
  slug: string;
  name: string;
  description: string;
};
