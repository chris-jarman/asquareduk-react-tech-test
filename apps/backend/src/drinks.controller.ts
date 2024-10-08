import { Controller, Get, Param, Query } from '@nestjs/common';

import { DrinksService } from './drinks.service.js';

@Controller({
  path: '/drinks',
})
export class DrinksController {
  constructor(private readonly drinksService: DrinksService) {}

  @Get('/')
  async getDrinks(
    @Query('offset') offset: number = 0,
    @Query('limit') limit: number = 10,
  ) {
    const drinks = await this.drinksService.getDrinks({
      offset,
      limit,
    });
    return drinks;
  }

  @Get('/:slug')
  async getDrinkBySlug(@Param('slug') slug: string) {
    const drink = await this.drinksService.getDrinkBySlug(slug);
    return drink;
  }
}
