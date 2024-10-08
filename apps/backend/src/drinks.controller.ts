import { Controller, Get, Param } from '@nestjs/common';

import { DrinksService } from './drinks.service';

@Controller({
  path: '/drinks',
})
export class DrinksController {
  constructor(private readonly drinksService: DrinksService) {}

  @Get('/')
  async getDrinks() {
    const drinks = await this.drinksService.getDrinks();
    return drinks;
  }

  @Get('/:slug')
  async getDrinkBySlug(@Param('slug') slug: string) {
    const drink = await this.drinksService.getDrinkBySlug(slug);
    return drink;
  }
}
