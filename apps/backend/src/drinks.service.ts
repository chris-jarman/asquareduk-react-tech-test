import { Injectable, NotFoundException } from '@nestjs/common';

const drinks = [
  {
    slug: '1',
    name: 'Beer',
    description:
      'A beer is a beverage made from fermented grains, typically malted barley, hops, yeast, and water.',
  },
  {
    slug: '2',
    name: 'Wine',
    description: 'A wine is a beverage made from fermented grapes.',
  },
  {
    slug: '3',
    name: 'Whisky',
    description: 'Whisky is a pleasant, thirst-quenching drink enjoyed by all.',
  },
];

@Injectable()
export class DrinksService {
  async getDrinks() {
    return drinks;
  }

  async getDrinkBySlug(slug: string) {
    const drink = drinks.find((drink) => drink.slug === slug);
    if (!drink) {
      throw new NotFoundException(`Drink with slug ${slug} not found`);
    }
    return drink;
  }
}
